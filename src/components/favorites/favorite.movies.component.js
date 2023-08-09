import React from "react";
import "./favorite.movies.component.styles.scss";
import { TbHeartMinus } from "react-icons/tb";

const FavoriteMovies = ({ removeFromFavorites, favorites, movieData }) => {
  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your favorite movies:</h1>
      <div className="movies-grid-favorites">
        {favorites.map((movie, index) => (
          <div className="grid-movie-item-favorites" key={index}>
            <h1 className="movie-title-favorites">
              {movieData[index]["#TITLE"]}
            </h1>
            <div className="img-container-favorites">
              {movieData[index]["#IMG_POSTER"] ? (
                <img
                  className="movie-img-favorites"
                  src={movieData[index]["#IMG_POSTER"]}
                  alt=""
                />
              ) : (
                <p className="error-info-image-favorites">No image</p>
              )}
            </div>
            <button
              className="remove-favorite-button"
              onClick={() => removeFromFavorites(index)}
            >
              <TbHeartMinus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
