import React, { useState } from "react";
import "./home.content.component.styles.scss";
import SelectedCard from "./selected.card.component";
import { AiFillStar } from "react-icons/ai";
import { TbHeartPlus } from "react-icons/tb";

const Content = ({ movieData, addToFavorites }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="grid-card">
      <div className="movies-grid">
        {movieData.map((movie, index) => (
          <div className="grid-movie-item" key={index}>
            <h1 className="movie-title">{movie["#TITLE"]}</h1>

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
              <button
                className="add-to-favorites-button"
                onClick={addToFavorites}
              >
                <TbHeartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="selected-movie-card">
          <SelectedCard selectedMovie={selectedMovie} />
        </div>
      )}
    </div>
  );
};

export default Content;
