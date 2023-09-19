import "./AuthDetails.styles.scss";
import { BsPersonCheckFill, BsFillPersonDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, userSelector } from "../../redux/userSlice";

const AuthDetails = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const logOutOfApp = () => {
    dispatch(resetUser());
  };
  const { isLoggedIn, email } = useSelector(userSelector);

  return (
    <div className="log-out-container">
      {isLoggedIn ? (
        <div className="email-logged-in">
          <span className="check-icon">
            <p className="welcome-txt">Welcome</p> <BsPersonCheckFill />
          </span>
          <p className="email-info">{email}</p>
          <button
            type="button"
            className="log-out-button"
            onClick={logOutOfApp}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="logged-out-container">
          <span className="check-icon-red">
            <BsFillPersonDashFill />
            <p className="logged-out-text">Logged Out</p>
          </span>
          <button type="submit" className="login-submit" onClick={handleSubmit}>
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
