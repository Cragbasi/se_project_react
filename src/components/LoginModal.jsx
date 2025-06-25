import { useEffect, useState } from "react";
import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const LoginModal = ({ isOpen, onLogIn, onClose, onOpenSignUpModal }) => {
  // declare state for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    window.addEventListener("keydown", handleEnterKey);

    // Reset input fields and clean up the event listener
    setEmail("");
    setPassword("");

    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open

  // create onChange handlers corresponding to each state variable
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();

    const submittedData = { email, password };
    onLogIn(submittedData);
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e); // Call submit handler
    }
  };

  return (
    <>
      {/* don't forget to pass appropriate props to ModalWithForm */}
      <ModalWithForm
        title="Log In"
        name="log-in"
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Log In"
        onSubmit={handleSubmit}
      >
        {/* Form inputs will go here */}
        {/* the contents of the form will go in here */}

        <label htmlFor="email" className="modal__input-label">
          {" "}
          Email*{" "}
        </label>
        <input
          type="email"
          id="email"
          className="modal__input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="30"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleEnterKey}
        />
        <label htmlFor="password" className="modal__input-label">
          Pasword*
        </label>
        <input
          id="password"
          className="modal__input"
          placeholder="Pasword"
          required
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleEnterKey}
        />

        <button
          type="submit"
          className="modal__button-save modal__button-save_log-in"
          onClick={() => {
            onOpenSignUpModal();
            onClose();
          }}
        >
          or Sign Up
        </button>
      </ModalWithForm>
    </>
  );
};

export default LoginModal;
