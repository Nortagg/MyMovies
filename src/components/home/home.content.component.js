import { useState } from "react";
import "./home.content.component.styles.scss";
import SelectedCard from "./selected.card.component";
import { AiFillStar } from "react-icons/ai";
import { TbHeartPlus } from "react-icons/tb";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { userSelector } from "../../redux/userSlice";

const Content = ({ movieData }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { uid } = useSelector(userSelector);

  const handleMovieClick = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  async function addFavoriteMovie(movie) {
    try {
      await addDoc(collection(db, "favorites"), {
        title: movie["#TITLE"],
        poster: movie["#IMG_POSTER"],
        url: movie["#IMDB_URL"],
        uid: uid,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

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
                onClick={() => addFavoriteMovie(movie)}
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
