import React, { useContext } from "react";
import "../blocks/Profile.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
// import Avatar from "../assets/Avatar.svg";

function SideBar({ onOpenEditProfileModal, signOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile__side-bar">
      <div className="profile__info-container">
        <img
          className="profile__avatar"
          src={currentUser?.avatar}
          alt="Header avatar"
        ></img>
        <p className="profile__name"> {currentUser?.name}</p>
      </div>
      <button
        type="button"
        id="changeProfileButton"
        className="change-profile__delete-button"
        onClick={onOpenEditProfileModal}
      >
        Change profile data
      </button>
      <button
        type="button"
        id="changeProfileButton"
        className="change-profile__delete-button"
        onClick={signOut}
      >
        Log out
      </button>
    </div>
  );
}
export default SideBar;
