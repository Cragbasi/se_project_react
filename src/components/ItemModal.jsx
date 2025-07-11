import "../blocks/ItemModal.css";
import closeImage from "../assets/closeImage.svg";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function ItemModal({
  isOpen,
  onClose,
  name,
  weather,
  link,
  owner,
  handleDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = owner === currentUser?._id;

  // Creating a variable which set in `className` for the delete button
  const itemDeleteButtonClassName = `image-modal__delete-button ${
    isOwn ? "" : "image-modal__delete-button_hidden"
  }`;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose, isOpen]);
  return (
    <section
      id="clickedPicture"
      className={`image-modal ${isOpen ? "image-modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="image-modal__container">
        <img
          className="image-modal__image"
          src={link}
          alt={`Photo of ${name}`}
        />
        <div className="image-modal__footer">
          <div className="image-modal__title-container">
            <h2 className="image-modal__title">{name}</h2>
            <h2 className="image-modal__title">Weather: {weather}</h2>
          </div>
          <button
            type="button"
            id="deleteImageButton"
            className={itemDeleteButtonClassName}
            onClick={handleDelete}
          >
            Delete item
          </button>
        </div>
        <button
          type="button"
          id="closeImageButton"
          className="image-modal__button-close"
          onClick={onClose}
        >
          <img src={closeImage} alt="Close button" />
        </button>
      </div>
    </section>
  );
}
export default ItemModal;
