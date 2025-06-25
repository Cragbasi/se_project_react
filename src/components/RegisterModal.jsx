import { useEffect, useState } from "react";
import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

const RegisterModal = ({ isOpen, onSignUp, onClose, onOpenLoginModal }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    setName("");
    setLink("");
    setEmail("");
    setPassword("");

    window.addEventListener("keydown", handleEnterKey);

    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();

    const submittedData = { name, link, email, password };
    console.log(name, link, email, password);
    onSignUp(submittedData);
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
        title="Sign Up"
        name="sign-up"
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Sign Up"
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
        <label htmlFor="name" className="modal__input-label">
          {" "}
          Name*{" "}
        </label>
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          name="name"
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleEnterKey}
        />
        <label htmlFor="avatar" className="modal__input-label">
          Avatar URL *
        </label>
        <input
          id="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          type="url"
          name="link"
          value={link}
          onChange={handleLinkChange}
          onKeyDown={handleEnterKey}
        />

        <button
          type="submit"
          className="modal__button-save modal__button-save_log-in"
          onClick={() => {
            onOpenLoginModal();
            onClose();
          }}
         
        >
          or Log In
        </button>
      </ModalWithForm>
    </>
  );
};

export default RegisterModal;
