import { useState } from "react";
import "./home.content.component.styles.scss";
import SelectedCard from "./selected.card.component";
import { AiFillStar } from "react-icons/ai";
import { TbHeartPlus } from "react-icons/tb";
import { PiClockClockwiseFill } from "react-icons/pi";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { userSelector } from "../../redux/userSlice";

const Content = ({ movieData }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [note, setNote] = useState("");

  const { uid } = useSelector(userSelector);

  const handleMovieClick = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
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
        setNote("Added to favorites!");
      } else {
        setNote("Movie already added!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTimeout(() => {
      setNote("");
    }, 4000);
  };
  const addWatchLater = async (movie) => {
    try {
      const favoritesRef = collection(db, "watchLater");
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
        setNote("Added to Watch Later!");
      } else {
        setNote("Already added to Watch Latter!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTimeout(() => {
      setNote("");
    }, 4000);
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
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="selected-movie-card">
          <SelectedCard selectedMovie={selectedMovie} />
        </div>
      )}
      <p className="movie-added-exists-note">{note}</p>
    </div>
  );
};

export default Content;