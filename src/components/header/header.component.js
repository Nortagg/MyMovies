import "./header.component.styles.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, userSelector } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const HeaderPart = ({ inputValue, handleChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigateHome = useNavigate();

  const { isLoggedIn } = useSelector(userSelector);

  const logOutOfApp = () => {
    dispatch(resetUser());
    setTimeout(() => {
      navigateHome("/");
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (/^[ ./\\=+]/.test(e.key) && e.target.selectionStart === 0) {
      e.preventDefault();
      setErrorMessage("Please enter a valid value");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="header-container">
      <Link className="home-link" to="/">
        <p className="movies-title">Movies</p>
        <span className="break">/</span>
        <p className="tvS">TvSeries</p>
      </Link>
      <div className="input-icon">
        <input
          className="input-bar"
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <span className="search-icon">
          <BsSearch />
        </span>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}

      {isLoggedIn ? (
        <div className="favorites-log-out-container">
          <Link className="watch-later-link" to="/watch-latter">
            Watch Later
          </Link>
          <Link className="favorites-link" to="/favorites">
            Favorites
          </Link>
          <button className="log-out-header-button" onClick={logOutOfApp}>
            Log Out
          </button>
        </div>
      ) : (
        <Link className="Login-link" to="/Login">
          Login
        </Link>
      )}
    </div>
  );
};
export default HeaderPart;
