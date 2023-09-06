import { useEffect, useState } from "react";
import "./already.wached.styles.scss";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { TbEyeX } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";

export const AlreadyWached = () => {
  const [alreadyWachedMovies, setAlreadyWachedMovies] = useState([]);

  const user = useSelector(userSelector);

  useEffect(() => {
    const fetchAlreadyWached = async () => {
      try {
        if (user.isLoggedIn) {
          const alreadyWachedCollection = collection(db, "alreadyWached");
          const queryAlreadyWached = await getDocs(alreadyWachedCollection);
          const alreadyWached = [];
          queryAlreadyWached.forEach((doc) => {
            const docData = doc.data();
            if (docData.uid === user.uid) {
              alreadyWached.push(docData);
            }
          });
          setAlreadyWachedMovies(alreadyWached);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAlreadyWached();
  }, [user]);

  const deleteAlreadyWached = async (movie) => {
    try {
      const alreadyWachedCollection = collection(db, "alreadyWached");
      const queryAlreadyWached = await getDocs(alreadyWachedCollection);
      queryAlreadyWached.forEach(async (doc) => {
        const docData = doc.data();
        if (
          docData.title === movie.title &&
          docData.poster === movie.poster &&
          docData.url === movie.url &&
          docData.uid === user.uid
        ) {
          await deleteDoc(doc.ref);
          const updatedAlreadyWached = alreadyWachedMovies.filter(
            (alreadyWachedMovie) => alreadyWachedMovie !== movie
          );
          setAlreadyWachedMovies(updatedAlreadyWached);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="already-wached-container">
      {alreadyWachedMovies.length > 0 ? (
        <h1 className="already-wached-list-title">Already wached:</h1>
      ) : (
        <p className="note-false-already-wached">
          Your "Already Wached" folder is empty.
          <br /> You can add Movies/TvSeries by pressing
          <span className="icon-false-already-wached">
            <TbEyeCheck />
          </span>
        </p>
      )}
      <div className="already-wached-list">
        {alreadyWachedMovies.map((movie, index) => (
          <div className="already-wached-card" key={index}>
            <img className="already-wached-poster" src={movie.poster} alt="" />
            <div className="title-url-button-already-wached">
              <h2 className="already-wached-title">{movie.title}</h2>
              <span className="span-url-button-already-wached">
                <a
                  className="already-wached-url"
                  href={movie.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Revisit movie
                </a>
                <button
                  className="remove-button-already-wached"
                  onClick={() => deleteAlreadyWached(movie)}
                >
                  <TbEyeX />
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
