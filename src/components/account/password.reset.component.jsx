import { useState } from "react";
import "./password.reset.component.styles.scss";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";

export const PasswordReset = () => {
  const [emailInput, setEmailInput] = useState("");
  const [note, setNote] = useState("");
  const [falseNote, setFalseNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { email } = useSelector(userSelector);

  const handlePassowrdReset = () => {
    const emailReset = getAuth();
    sendPasswordResetEmail(emailReset, emailInput)
      .then(() => {
        setNote("Password reset email sent successfully to");
        setIsSuccess(true);
      })
      .catch(() => {
        if (!email) {
          setFalseNote("Bad request or email missing!");
        }
        setIsSuccess(false);
      });
  };

  setTimeout(() => {
    setIsSuccess();
    setFalseNote();
  }, 5000);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handlePassowrdReset();
  };

  return (
    <div className="password-reset-containter">
      <h1 className="header-title">Forgot password?</h1>
      <form className="form-container" onSubmit={handleFormSubmit}>
        <input
          className="input-styles"
          type="email"
          placeholder="Enter email for password change"
          value={emailInput}
          name="email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button
          type="button"
          className="button-to-handle-reset"
          onClick={handlePassowrdReset}
        >
          Send Reset Email
        </button>

        {isSuccess && (
          <p className="note-message">
            {note} <span className="span-email">{emailInput}</span>
          </p>
        )}
        <p className="false-note-message">{falseNote}</p>
      </form>
    </div>
  );
};
