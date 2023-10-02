import { useState } from "react";
import "./password.reset.component.styles.scss";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [falseNote, setFalseNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePassowrdReset = () => {
    const emailReset = getAuth();
    sendPasswordResetEmail(emailReset, email)
      .then(() => {
        setNote("Password reset email sent successfully to");
        setIsSuccess(true);
      })
      .catch((error) => {
        if (!email) {
          setFalseNote("Bad request or email missing!");
        }
        console.error("Error sending password reset email:", error.message);
        setIsSuccess(false);
      });
  };

  // setTimeout(() => {
  //   setIsSuccess();
  //   setFalseNote();
  // }, 5000);

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
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          className="button-to-handle-reset"
          onClick={handlePassowrdReset}
        >
          Reset Password
        </button>

        {isSuccess && (
          <p className="note-message">
            {note} <span className="span-email">{email}</span>
          </p>
        )}
        <p className="false-note-message">{falseNote}</p>
      </form>
    </div>
  );
};
