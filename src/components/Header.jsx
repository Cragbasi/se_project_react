import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import { Link } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.jsx";
import Logo from "../assets/Logo.svg";
import ToggleSwitch from "./ToggleSwitch.jsx";
import "../blocks/Header.css";

function Header({
  weatherData,
  onOpenAddItemModal,
  onOpenLoginModal,
  onOpenSignUpModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) return <div>Loading...</div>;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentTemperatureUnit, handleToggleSwitch } = useContext(
    CurrentTemperatureUnitContext
  );

  // If user's name is "John Doe", get "J"
  // console.log(currentUser.name[0]?.toUpperCase());
  const firstLetter = currentUser.name[0]?.toUpperCase();

  return (
    <div className="header">
      <div className="header__container ">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="Header logo" />
        </Link>
        <p className="header__date-and-location ">
          {/* Render date and location */}
          {currentDate}, {weatherData?.city}
        </p>
      </div>
      <div className="header__container ">
        <ToggleSwitch
          onChange={handleToggleSwitch}
          isChecked={currentTemperatureUnit === "C"}
        />
        {currentUser._id && (
          <button
            type="button"
            className="header__add-clothes-button"
            onClick={onOpenAddItemModal}
          >
            + Add clothes
          </button>
        )}
        {!currentUser._id && (
          <button
            type="button"
            className="header__add-clothes-button"
            onClick={onOpenSignUpModal}
          >
            Sign Up
          </button>
        )}
        {!currentUser._id && (
          <button
            type="button"
            className="header__add-clothes-button"
            onClick={onOpenLoginModal}
          >
            Log In
          </button>
        )}

        {currentUser._id && (
          <Link to="/profile">
            <p className="header__profile-name"> {currentUser?.name}</p>
          </Link>
        )}

        {currentUser._id && (
          <Link to="/profile">
            {currentUser.avatar ? (
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">{firstLetter}</div>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
