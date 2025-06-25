import { useEffect, useState } from "react";
import "../blocks/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm.jsx";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    setName("");
    setLink("");
    setWeather("");
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();

    const submittedData = { name, link, weather };
    onAddItem(submittedData);
  }

  return (
    <>
      {/* don't forget to pass appropriate props to ModalWithForm */}
      <ModalWithForm
        title="New Garment"
        name="new-garment"
        onClose={onClose}
        isOpen={isOpen}
        buttonText="Add garment"
        onSubmit={handleSubmit}
      >
        {/* Form inputs will go here */}
        {/* the contents of the form will go in here */}

        <label htmlFor="caption" className="modal__input-label">
          {" "}
          Name{" "}
        </label>
        <input
          type="text"
          id="caption"
          className="modal__input"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="picture" className="modal__input-label">
          Image
        </label>
        <input
          id="picture"
          className="modal__input"
          placeholder="Image URL"
          required
          type="url"
          name="link"
          value={link}
          onChange={handleLinkChange}
        />
        <fieldset className="modal__fieldset">
          <h2 className="modal__fieldset-title">Select the weather type:</h2>
          <div className="modal__radio-botton-container">
            <input
              className="modal__input-radio"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
              onChange={handleWeatherChange}
            />

            <label htmlFor="hot" className="modal__input-radio-label">
              Hot
            </label>
          </div>

          <div className="modal__radio-botton-container">
            <input
              className="modal__input-radio"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              onChange={handleWeatherChange}
            />

            <label htmlFor="warm" className="modal__input-radio-label">
              Warm
            </label>
          </div>
          <div className="modal__radio-botton-container">
            <input
              className="modal__input-radio"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
              onChange={handleWeatherChange}
            />
            <label htmlFor="cold" className="modal__input-radio-label">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </>
  );
};

export default AddItemModal;
