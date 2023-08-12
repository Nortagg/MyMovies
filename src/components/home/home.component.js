import "./home.component.styles.scss";
import Content from "./home.content.component";
import WelcomeCard from "./welcome.card";
import { PiPopcorn } from "react-icons/pi";

const HomePage = ({ loading, movieData }) => {
  return (
    <div className="form-wrapper">
      {loading ? (
        <div className="loading-container">
          <p className="message">One sec!</p>
          <div className="spinner">
            <span className="popcorn">
              <PiPopcorn />
            </span>
          </div>
        </div>
      ) : !movieData.length ? (
        <WelcomeCard />
      ) : (
        <Content movieData={movieData} />
      )}
    </div>
  );
};

export default HomePage;
