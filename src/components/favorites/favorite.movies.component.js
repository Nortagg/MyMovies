import React, { useEffect, useState } from "react";
import "./favorite.movies.component.styles.scss";
import { TbHeartMinus } from "react-icons/tb";
import { TfiLink } from "react-icons/tfi";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const user = useSelector(userSelector);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (user.isLoggedIn) {
          const favoriteMoviesCollection = collection(db, "favorites");
          const querySnapshot = await getDocs(favoriteMoviesCollection);
          const favorites = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
            if (docData.uid === user.uid) {
              favorites.push(docData);
            }
          });
          setFavoriteMovies(favorites);
        }
      } catch (error) {
        console.error("Error fetching favorite movies: ", error);
      }
    };

    fetchFavoriteMovies();
  }, [user]);

  const handleDelete = async (movie) => {
    try {
      const favoriteMoviesCollection = collection(db, "favorites");
      const querySnapshot = await getDocs(favoriteMoviesCollection);
      querySnapshot.forEach(async (doc) => {
        const docData = doc.data();
        if (
          docData.title === movie.title &&
          docData.poster === movie.poster &&
          docData.url === movie.url &&
          docData.uid === user.uid
        ) {
          await deleteDoc(doc.ref);
          const updatedFavorites = favoriteMovies.filter(
            (favMovie) => favMovie !== movie
          );
          setFavoriteMovies(updatedFavorites);
        }
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your favorite movies:</h1>
      <div className="movies-grid-favorites">
        {favoriteMovies.map((movie, index) => (
          <div className="grid-movie-item-favorites" key={index}>
            {movie.poster ? (
              <img className="movie-img-favorites" src={movie.poster} alt="" />
            ) : (
              <p className="error-info-image-favorites">No image</p>
            )}

            <div className="description-container">
              <h1 className="movie-title-favorites">{movie.title}</h1>
              <span className="trailer-remove-button">
                <a
                  className="link-to-movie"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={movie.url}
                >
                  <TfiLink /> WATCH TRAILER
                </a>
                <button
                  className="remove-favorite-button"
                  onClick={() => handleDelete(movie)}
                >
                  <TbHeartMinus />
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
