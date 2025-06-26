import "../blocks/Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function Profile({
  weatherData,
  defaultClothingItems,
  onCardClick,
  onOpenModal,
  onOpenEditProfileModal,
  signOut,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <SideBar
        onOpenEditProfileModal={onOpenEditProfileModal}
        signOut={signOut}
      />
      <ClothesSection
        weatherData={weatherData}
        defaultClothingItems={defaultClothingItems}
        onCardClick={onCardClick}
        onOpenModal={onOpenModal}
        onCardLike={onCardLike}
      />
    </div>
  );
}
export default Profile;
