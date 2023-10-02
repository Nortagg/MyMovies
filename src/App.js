import "./App.styles.scss";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDebounce } from "./debounce";
import HomePage from "./components/home/home.component";
import Login from "./components/account/login.component";
import HeaderPart from "./components/header/header.component";
import Register from "./components/account/register.component";
import FavoriteMovies from "./components/favorites/favorite.movies.component";
import { PasswordReset } from "./components/account/password.reset.component";
import { WatchLatter } from "./components/watched/watch.later";
import { useDispatch } from "react-redux";
import { resetUser, setUser } from "./redux/userSlice";

function App() {
  const [inputValue, setinputValue] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChange = (event) => {
    setinputValue(event.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }));
      }
      return () => {
        dispatch(resetUser());
      };
    });
  }, [dispatch]);

  useEffect(() => {
    if (debouncedValue !== "") {
      setLoading(true);
      fetch(`https://imdb-search2.p.rapidapi.com/${debouncedValue}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "imdb-search2.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((MainData) => {
          setMovieData(MainData.description);
          console.log(MainData);
          setLoading(false);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [debouncedValue]);

  return (
    <div className="App">
      <HeaderPart inputValue={inputValue} handleChange={handleChange} />
      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage movieData={movieData} loading={loading} />}
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/favorites" element={<FavoriteMovies />}></Route>
        <Route path="/watch-latter" element={<WatchLatter />}></Route>
        <Route path="/password-reset" element={<PasswordReset />}></Route>
      </Routes>
    </div>
  );
}

export default App;
