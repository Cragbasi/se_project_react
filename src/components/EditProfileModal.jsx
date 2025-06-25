import { useEffect, useState } from "react";
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const EditProfileModal = ({ isOpen, onClose, onSubmitEditProfile }) => {
  // accessing current user via context
  const currentUser = useContext(CurrentUserContext);
  // declare state for each input field
  const [NameAndAvatarChange, setNameAndAvatarChange] = useState({
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
  });

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    if (!isOpen || !currentUser) return;

    setNameAndAvatarChange({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });
  }, [isOpen, currentUser]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setNameAndAvatarChange((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    setNameAndAvatarChange((prevState) => ({
      ...prevState,
      avatar: e.target.value,
    }));
  };

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();

    onSubmitEditProfile(NameAndAvatarChange);
  }

  return (
    <>
      {/* don't forget to pass appropriate props to ModalWithForm */}
      <ModalWithForm
        title="Change profile data"
        name="update-profile"
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Save changes"
        onSubmit={handleSubmit}
      >
        {/* Form inputs will go here */}
        {/* the contents of the form will go in here */}

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
          value={NameAndAvatarChange.name}
          onChange={handleNameChange}
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
          value={NameAndAvatarChange.avatar}
          onChange={handleAvatarChange}
        />
      </ModalWithForm>
    </>
  );
};

export default EditProfileModal;
