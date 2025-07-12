import "../blocks/Profile.css";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ClothesSection({
  weatherData,
  defaultClothingItems,
  onCardClick,
  onOpenModal,
  onCardLike,
}) {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const currentUser = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item

  const filteredClothesByUser = defaultClothingItems.filter((item) => {
    return item.owner === currentUser?._id;
  });

  return (
    <div className="cards">
      <div className="cards__title-container ">
        <p className="cards__title"> Your items</p>
        <button
          type="button"
          className="cards__add-clothes-button"
          onClick={onOpenModal}
        >
          + Add clothes
        </button>
      </div>
      <ul className="cards__container">
        {/* Map clothing items to DOM*/}
        {filteredClothesByUser.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            weatherData={weatherData}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
