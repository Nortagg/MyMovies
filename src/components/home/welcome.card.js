import "./welcome.card.styles.scss";

const WelcomeCard = () => {
  return (
    <>
      <div className="welcome-card">
        <span className="welcome-txt">
          Welcome! Please enter a movie/TvSeries name to get started
        </span>
      </div>
      <div className="blur"></div>
      <div className="background-cards">
        <div className="card-1"></div>
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
