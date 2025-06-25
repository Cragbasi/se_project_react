import "../blocks/Profile.css";
import ItemCard from "./ItemCard";

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
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            weatherData={weatherData}
            defaultClothingItems={defaultClothingItems}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
