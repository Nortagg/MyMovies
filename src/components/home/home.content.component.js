import { useState } from "react";
import "./home.content.component.styles.scss";
import SelectedCard from "./selected.card.component";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { TbHeartPlus, TbEyeCheck } from "react-icons/tb";
import { PiClockClockwiseFill } from "react-icons/pi";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { userSelector } from "../../redux/userSlice";

const Content = ({ movieData }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [note, setNote] = useState("");
  const [info, setInfo] = useState(false);

  const { uid, isLoggedIn } = useSelector(userSelector);

  const handleMovieClick = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  const handleInfoMessage = () => {
    setInfo(true);
  };

  const addFavoriteMovie = async (movie) => {
    try {
      const favoritesRef = collection(db, "favorites");
      const querySnapshot = await getDocs(
        query(
          favoritesRef,
          where("title", "==", movie["#TITLE"]),
          where("poster", "==", movie["#IMG_POSTER"]),
          where("url", "==", movie["#IMDB_URL"])
        )
      );

      if (querySnapshot.empty) {
        await addDoc(favoritesRef, {
          title: movie["#TITLE"],
          poster: movie["#IMG_POSTER"],
          url: movie["#IMDB_URL"],
          uid: uid,
        });
        setNote(
          <div>
            Added to favorites!
            <span className="icon-note-favorites">
              <TbHeartPlus />
            </span>
          </div>
        );
      } else {
        setNote("Movie already added!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTimeout(() => {
      setNote("");
    }, 2000);
  };
  const addWatchLater = async (movie) => {
    try {
      const watchLaterRef = collection(db, "watchLater");
      const querySnapshot = await getDocs(
        query(
          watchLaterRef,
          where("title", "==", movie["#TITLE"]),
          where("poster", "==", movie["#IMG_POSTER"]),
          where("url", "==", movie["#IMDB_URL"])
        )
      );

      if (querySnapshot.empty) {
        await addDoc(watchLaterRef, {
          title: movie["#TITLE"],
          poster: movie["#IMG_POSTER"],
          url: movie["#IMDB_URL"],
          uid: uid,
        });
        setNote(
          <div>
            Added to Watch Later!
            <span className="icon-note-watch-later">
              <PiClockClockwiseFill />
            </span>
          </div>
        );
      } else {
        setNote("Already added to Watch Latter!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTimeout(() => {
      setNote("");
    }, 2000);
  };
  const addAlreadyWached = async (movie) => {
    try {
      const alreadyWachedRef = collection(db, "alreadyWached");
      const querySnapshot = await getDocs(
        query(
          alreadyWachedRef,
          where("title", "==", movie["#TITLE"]),
          where("poster", "==", movie["#IMG_POSTER"]),
          where("url", "==", movie["#IMDB_URL"])
        )
      );

      if (querySnapshot.empty) {
        await addDoc(alreadyWachedRef, {
          title: movie["#TITLE"],
          poster: movie["#IMG_POSTER"],
          url: movie["#IMDB_URL"],
          uid: uid,
        });
        setNote(
          <div>
            Added to Already Wached!
            <span className="icon-note-already-wached">
              <TbEyeCheck />
            </span>
          </div>
        );
      } else {
        setNote("This item already exists!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTimeout(() => {
      setNote("");
    }, 2000);
  };

  return (
    <div className="grid-card">
      <div className="movies-grid">
        {movieData.map((movie, index) => (
          <div className="grid-movie-item" key={index}>
            <div
              className="img-container"
              onClick={() => handleMovieClick(movie)}
            >
              {movie["#IMG_POSTER"] ? (
                <img className="movie-img" src={movie["#IMG_POSTER"]} alt="" />
              ) : (
                <p className="error-info-image">No image</p>
              )}
            </div>
            <h1 className="movie-title">{movie["#TITLE"]}</h1>
            <div className="rank-year-qid">
              {movie["#YEAR"] ? (
                <p className="year-num">{movie["#YEAR"]}</p>
              ) : (
                <p className="error-info">No year data</p>
              )}
              <div className="icon-rank">
                <span className="star-svg">
                  <AiFillStar />
                </span>
                {movie["#RANK"] ? (
                  <p className="rank-num">{movie["#RANK"]}</p>
                ) : (
                  <p className="error-info">No rank data</p>
                )}
              </div>
              {isLoggedIn ? (
                <span className="buttons-favorites-watchLatter">
                  <button
                    className="add-to-favorites-button"
                    onClick={() => addFavoriteMovie(movie)}
                  >
                    <TbHeartPlus />
                  </button>
                  <button
                    className="add-to-watch-later-button"
                    onClick={() => addWatchLater(movie)}
                  >
                    <PiClockClockwiseFill />
                  </button>{" "}
                  <button
                    className="add-to-already-wached"
                    onClick={() => addAlreadyWached(movie)}
                  >
                    <TbEyeCheck />
                  </button>
                </span>
              ) : (
                <span className="buttons-favorites-watchLatter">
                  <button
                    className="button-not-logged-in"
                    onClick={handleInfoMessage}
                  >
                    <TbHeartPlus />
                  </button>
                  <button
                    className="button-not-logged-in"
                    onClick={handleInfoMessage}
                  >
                    <PiClockClockwiseFill />
                  </button>{" "}
                  <button
                    className="button-not-logged-in"
                    onClick={handleInfoMessage}
                  >
                    <TbEyeCheck />
                  </button>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="selected-movie-card">
          <SelectedCard selectedMovie={selectedMovie} />
        </div>
      )}
      <p className="movie-added-exists-note">
        {note}
        <br />
      </p>
      {info && (
        <div className="info-message">
          Login to get access{" "}
          <span className="arrow-right-icon">
            <AiOutlineArrowRight />
          </span>
        </div>
      )}
    </div>
  );
};

export default Content;
