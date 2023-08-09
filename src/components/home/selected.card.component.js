import "./selected.card.component.scss";

const SelectedCard = ({ selectedMovie }) => {
  return (
    <div className="selected-card-container">
      <h2 className="title">{selectedMovie["#TITLE"]}</h2>
      <a
        className="link-and-container"
        target="_blank"
        rel="noopener noreferrer"
        href={selectedMovie["#IMDB_URL"]}
      >
        {selectedMovie["#IMG_POSTER"] ? (
          <img
            className="movie-img-card"
            src={selectedMovie["#IMG_POSTER"]}
            alt=""
          />
        ) : (
          <p>No image</p>
        )}
      </a>
      {selectedMovie["#ACTORS"] ? (
        <p className="actors">{selectedMovie["#ACTORS"]}</p>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default SelectedCard;
