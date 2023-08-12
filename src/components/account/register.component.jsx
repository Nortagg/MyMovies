import { useState } from "react";
import "./register.component.styles.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Decoration from "./decoration";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigateLogin = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="**********"
          name="password"
        />
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
