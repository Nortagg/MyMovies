import { useEffect, useState } from "react";
import "./watch.later.styles.scss";
import { AlreadyWached } from "./already.wached";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { TbClockMinus } from "react-icons/tb";
import { PiClockClockwiseFill } from "react-icons/pi";

export const WatchLatter = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);

  const user = useSelector(userSelector);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        if (user.isLoggedIn) {
          const watchLaterCollection = collection(db, "watchLater");
          const queryWatchLater = await getDocs(watchLaterCollection);
          const watchLater = [];
          queryWatchLater.forEach((doc) => {
            const docData = doc.data();
            if (docData.uid === user.uid) {
              watchLater.push(docData);
            }
          });
          setWatchLaterMovies(watchLater);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchWatchLater();
  }, [user]);

  const deleteWatchMovie = async (movie) => {
    try {
      const watchLaterCollection = collection(db, "watchLater");
      const queryWatchLater = await getDocs(watchLaterCollection);
      queryWatchLater.forEach(async (doc) => {
        const docData = doc.data();
        if (
          docData.title === movie.title &&
          docData.poster === movie.poster &&
          docData.url === movie.url &&
          docData.uid === user.uid
        ) {
          await deleteDoc(doc.ref);
          const updatedWatchLater = watchLaterMovies.filter(
            (watchLaterMovie) => watchLaterMovie !== movie
          );
          setWatchLaterMovies(updatedWatchLater);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="wached-watch-later-container">
      <div className="watch-later-container">
        {watchLaterMovies.length > 0 ? (
          <h1 className="watch-later-list-title">Watch later:</h1>
        ) : (
          <p className="note-false-watch-later">
            Your "Watch Later" is folder empty.
            <br /> You can add Movies/TvSeries by pressing
            <span className="icon-false-watch-later">
              <PiClockClockwiseFill />
            </span>
          </p>
        )}
        <div className="movies-list">
          {watchLaterMovies.map((movie, index) => (
            <div className="watch-list-card" key={index}>
              <img className="watch-later-poster" src={movie.poster} alt="" />
              <div className="title-url-button-wrap">
                <h2 className="watch-later-title">{movie.title}</h2>
                <span className="span-url-button">
                  <a
                    className="watch-later-url"
                    href={movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Trailer
                  </a>
                  <button
                    className="remove-button"
                    onClick={() => deleteWatchMovie(movie)}
                  >
                    <TbClockMinus />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AlreadyWached />
    </div>
  );
};
