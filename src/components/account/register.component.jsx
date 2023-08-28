import { useState } from "react";
import "./register.component.styles.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Decoration from "./decoration";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePassword = () => {
    if (passwordVisible === "password") {
      setPasswordVisible("text");
      return;
    }
    setPasswordVisible("password");
  };

  const navigateLogin = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError("Email is required!");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required!");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required!");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          })
        );
        setTimeout(() => {
          navigateLogin("/Login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  return (
    <div className="form-register-container">
      <Decoration />
      <form className="register-form" onSubmit={handleSubmit}>
        <Link className="link-home" to="/">
          <span className="link-home-text">Home</span>
          <span className="link-home-icon">
            <IoMdArrowBack />
          </span>
        </Link>
        <h1 className="register-title">Register</h1>
        <label>email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Enter your email"
          name="email"
        />
        {emailError && <div className="error-message">{emailError}</div>}
        <label>password</label>
        <div className="input-password-container-register">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={passwordVisible}
            placeholder="**********"
            name="password"
          />
          <button
            className="eye-button-register"
            type="button"
            onClick={togglePassword}
          >
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
        <label>confirm password</label>
        <div className="input-password-container-register">
          <input
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type={passwordVisible}
            placeholder="**********"
            name="confirmPassword"
          />{" "}
          <button
            className="eye-button-register"
            type="button"
            onClick={togglePassword}
          >
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
        {confirmPasswordError && (
          <div className="error-message">{confirmPasswordError}</div>
        )}
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button className="register-submit" type="submit">
          Register
        </button>
        <Link className="link-to-login" to="/Login">
          Already have an account? Login here.
        </Link>
      </form>
    </div>
  );
};

export default Register;
