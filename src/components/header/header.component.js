import "./header.component.styles.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { resetUser, userSelector } from "../../redux/userSlice";

const HeaderPart = ({ inputValue, handleChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const { isLoggedIn, email } = useSelector(userSelector);

  const logOutOfApp = () => {
    dispatch(resetUser());
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
      <Link className="movies-title" to="/">
        Movies
        <span className="break">/</span>
        <span className="tvS">TvSeries</span>
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
          <Link className="favorites-link" to="/favorites">
            Favorites
          </Link>
          <button className="log-out-header-button" onClick={logOutOfApp}>
            Log Out
          </button>
          <div className="popUp">
            <p className="popUp-text">
              Welcome back <br /> {email}
            </p>
            <span className="popUp-progress"></span>
          </div>
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
