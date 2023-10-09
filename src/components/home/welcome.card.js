import { useState } from "react";
import "./welcome.card.styles.scss";
import { BsSearch } from "react-icons/bs";

const WelcomeCard = ({ inputValue, handleChange }) => {
  const [toggleSearch, setToggleSearch] = useState(false);

  const toggleInput = () => {
    setToggleSearch(!toggleSearch);
  };

  return (
    <>
      <div className="welcome-card">
        {toggleSearch ? (
          <div className="input-icon">
            <input
              className="input-bar"
              type="text"
              placeholder="Search here"
              onChange={handleChange}
              value={inputValue}
            />
            <span className="search-icon">
              <BsSearch />
            </span>
          </div>
        ) : (
          <span className="welcome-txt">
            Welcome! Kindly provide the name of a movie or TV series to begin.{" "}
            <button className="toggle-button" onClick={toggleInput}></button>
          </span>
        )}
      </div>
      <div className="blur"></div>
      <div className="background-cards">
        <div className="card-1"></div>
        <div className="handle-1">
          <span className="line-handle"></span>
          <span className="line-handle"></span>
          <span className="sword-button"></span>
          <span className="line-handle"></span>
          <span className="line-handle"></span>
        </div>
        <div className="blade-1"></div>
        <div className="card-2"></div>
        <div className="card-3"></div>
        <div className="card-4"></div>
        <div className="card-5"></div>
        <div className="card-6"></div>
        <div className="card-7"></div>
        <div className="card-8"></div>
        <div className="card-9"></div>
        <div className="card-10"></div>
      </div>
    </>
  );
};
export default WelcomeCard;
