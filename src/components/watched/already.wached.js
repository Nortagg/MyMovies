import { useEffect, useState } from "react";
import "./already.wached.styles.scss";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { TbEyeX } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";
import { BsLink45Deg } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export const AlreadyWached = () => {
  const [alreadyWachedMovies, setAlreadyWachedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  const getCurrentWachedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return alreadyWachedMovies.slice(startIndex, endIndex);
  };

  return (
    <div className="already-wached-title-container">
      {alreadyWachedMovies.length > 0 ? (
        <>
          <h1 className="already-wached-list-title">Already wached:</h1>{" "}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <MdArrowBackIos />
            </button>
            <button
              disabled={
                currentPage * itemsPerPage >= alreadyWachedMovies.length
              }
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <MdArrowForwardIos />
            </button>
          </div>
        </>
      ) : (
        <p className="note-false-already-wached">
          Your "Already Wached" folder is empty.
          <br /> You can add Movies/TvSeries by pressing
          <span className="icon-false-already-wached">
            <TbEyeCheck />
          </span>
        </p>
      )}
      <div className="already-wached-container">
        <div className="already-wached-list">
          {getCurrentWachedItems().map((movie, index) => (
            <div className="already-wached-card" key={index}>
              <div className="poster-url">
                <img
                  className="already-wached-poster"
                  src={movie.poster}
                  alt=""
                />
                <a
                  className="already-wached-url"
                  href={movie.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLink45Deg />
                </a>
              </div>
              <div className="title-url-button-already-wached">
                <h2 className="already-wached-title">{movie.title}</h2>
                <button
                  className="remove-button-already-wached"
                  onClick={() => deleteAlreadyWached(movie)}
                >
                  <TbEyeX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
