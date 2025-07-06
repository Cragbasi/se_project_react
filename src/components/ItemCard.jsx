import "../blocks/ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item?.likes?.some((id) => id === currentUser._id);
  // Creating a variable which you'll then set in `className` for the love button
  const itemLikeButtonClassName = `item-card__love-button  ${
    !isLiked ? "" : "item-card__love-button_activated"
  }`;

  // console.log(item.owner);

  return (
    <li
      className="item-card"
      onClick={() =>
        onCardClick(
          item._id,
          item.name,
          item.weather,
          item.imageUrl,
          item.owner
        )
      }
    >
      <img className="item-card__image" src={item.imageUrl} alt={item.name} />
      <div className="item-card__header-container ">
        <h2 className="item-card__title">{item.name}</h2>
        {currentUser._id && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={(e) => {
              e.stopPropagation(); // Stops the event from bubbling up
              onCardLike(item._id, isLiked);
            }}
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
