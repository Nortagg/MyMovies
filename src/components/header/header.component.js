import "./header.component.styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, userSelector } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const HeaderPart = ({ inputValue, handleChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { email } = useSelector(userSelector);

  const dispatch = useDispatch();
  const navigateHome = useNavigate();
  const { isLoggedIn } = useSelector(userSelector);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

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
        <p className="home-hover">Home</p>
      </Link>
      {isHomePage && (
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
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isLoggedIn ? (
        <div className="favorites-log-out-container">
          <div className="popUp">
            <p className="popUp-text">
              Welcome
              <br /> <p className="email-popup">{email}</p>
            </p>
            <span className="popUp-progress"></span>
          </div>
          <Link className="watch-link" to="/watch-latter">
            Watch
          </Link>
          <span className="header-line"></span>
          <Link className="favorites-link" to="/favorites">
            Favorites
          </Link>
          <span className="header-line"></span>
          <button className="log-out-header-button" onClick={logOutOfApp}>
            <span className="log-out-icon">
              <FiLogOut />
            </span>
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
