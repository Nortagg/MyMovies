import "./login.component.styles.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import AuthDetails from "./AuthDetails";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Decoration from "./decoration";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState("password");
  const [placeholderVisible, setPlaceholderVisible] = useState("*********");

  const navigateHome = useNavigate();
  const dispatch = useDispatch();

  const togglePassword = () => {
    if ((passwordVisible === "password", placeholderVisible === "*********")) {
      setPasswordVisible("text");
      setPlaceholderVisible("");
    } else {
      setPasswordVisible("password");
      setPlaceholderVisible("*********");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setIncorrectPassword(false);
    setIncorrectEmail(false);

    let hasError = false;
    if (!email) {
      setEmailError("Email is required!");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required!");
      hasError = true;
    }
    if (hasError) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          setUser({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );

        console.log("Login successful!");

        setTimeout(() => {
          navigateHome("/");
        }, 1000);
      })
      .catch((error) => {
        if (error) {
          setIncorrectPassword(true);
          setIncorrectEmail(true);
        }
      });
  };

  return (
    <div className="form-login-container">
      <Decoration />
      <form className="login-form" onSubmit={handleSubmit}>
        <Link className="link-home" to="/">
          <span className="link-home-text">Home</span>
          <span className="link-home-icon">
            <IoMdArrowBack />
          </span>
        </Link>{" "}
        <h1 className="login-title">Login</h1>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Enter your email"
          name="email"
        />
        {incorrectEmail && (
          <div className="error-message">
            Incorrect Email. Please try again.
          </div>
        )}
        {emailError && <div className="error-message">{emailError}</div>}
        <label htmlFor="password">password</label>
        <div className="input-password-container">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={passwordVisible}
            placeholder={placeholderVisible}
            name="password"
          />
          <button className="eye-button" type="button" onClick={togglePassword}>
            {passwordVisible === "password" ? (
              <span className="password-true">
                <AiOutlineEyeInvisible />
              </span>
            ) : (
              <span className="password-false">
                <AiOutlineEye />
              </span>
            )}
          </button>
        </div>
        {incorrectPassword && (
          <div className="error-message">
            Incorrect password. Please try again.
          </div>
        )}
        {passwordError && <div className="error-message">{passwordError}</div>}
        <AuthDetails handleSubmit={handleSubmit} />
        <Link className="link-to-register" to="/Register">
          Don't have an account? Register here.
        </Link>
      </form>
    </div>
  );
};
export default Login;
