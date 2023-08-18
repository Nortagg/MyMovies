import { useSelector } from "react-redux";
import "./welcome.card.styles.scss";
import { userSelector } from "../../redux/userSlice";

const WelcomeCard = () => {
  const { email } = useSelector(userSelector);
  return (
    <>
      <div className="welcome-card">
        <span className="welcome-txt">
          Welcome! Kindly provide the name of a movie or TV series to begin.
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
      {email ? (
        <div className="popUp">
          <p className="popUp-text">
            Welcome back <br /> <span className="email-popup">{email}</span>
          </p>
          <span className="popUp-progress"></span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default WelcomeCard;
