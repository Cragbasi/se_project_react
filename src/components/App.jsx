import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CurrentTemperatureUnitProvider } from "../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import "../blocks/App.css";
import { WeatherApi } from "../utils/WeatherApi.js";
import { ApiForClothingItems } from "../utils/api.js";
import {
  coordinate,
  APIkey,
  defaultClothingItems,
} from "../utils/constants.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";

import Profile from "./Profile.jsx";
import AddItemModal from "./AddItemModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import ProtectedRoute from "../utils/ProtectedRoute";
import { ApiForAuthentication } from "../utils/auth.js";
import { setToken, getToken } from "../utils/token.js";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.cragbasi.blinklab.com"
    : "http://localhost:3001";

const apiClothingItems = new ApiForClothingItems({
  baseUrl: `${baseUrl}/items`,
});
const apiForAuthentication = new ApiForAuthentication({
  baseUrl: baseUrl,
});

const apiForWeather = new WeatherApi({
  baseUrl: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&units=imperial&appid=${APIkey}`,
});

function App() {
  // Add the isLoggedIn state variable with default value of 'false'.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [clothingItems, setClothingItems] = useState([]);

  const handleAddItem = (item) => {
    console.log(item);
    const jwt = getToken();
    console.log("token:", jwt);
    apiClothingItems
      .postItem(item.name, item.weather, item.link, jwt)
      .then((res) => {
        console.log("New item:", res);
        handleCloseAddItemModal();
        // Add the new item at the beginning of the array
        setClothingItems((prevItems) => [res, ...prevItems]);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  const handleDeleteItem = (id) => {
    const jwt = getToken();
    apiClothingItems
      .deleteItem(id, jwt)
      .then((res) => {
        handleItemModalClose();
        // Add the new item at the beginning of the array
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  const handleCardLike = (id, isLiked) => {
    const token = getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        apiClothingItems
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        apiClothingItems
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };
  const [currentUser, setCurrentUser] = useState({
    avatar: "",
    email: "",
    name: "",
    __v: "",
    _id: "",
  });

  useEffect(() => {
    console.log("CurrentUser state updated:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    console.log("useeffect for jwt:", jwt);

    // TODO - handle JWT
    apiForAuthentication
      .getUserInfo(jwt)
      .then((res) => {
        // If the response is successful, log the user in, save their

        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch(console.error);
  }, []);
  const handleSignUp = (item) => {
    apiForAuthentication
      .signUp(item.name, item.link, item.email, item.password)
      .then((res) => {
        console.log("New sign up:", res);
        handleCloseSignUpModal();
        setCurrentUser(res.user);
        setIsLoggedIn(true);

        setToken(res.token);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };
  const handleLogIn = (item) => {
    apiForAuthentication
      .signIn(item.email, item.password)
      .then((res) => {
        console.log("New log in:", res);
        handleCloseisLoginModal();
        if (res.token) {
          // Save the token to local storage
          setToken(res.token);
          setCurrentUser(res.user);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  const handleSignOut = () => {
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser({
      avatar: "",
      email: "",
      name: "",
      __v: "",
      _id: "",
    });
  };

  const handleEditProfile = (item) => {
    const jwt = getToken();
    apiForAuthentication
      .updateUserProfile(item.name, item.avatar, jwt)
      .then((res) => {
        console.log("New name and avatar:", res);
        handleCloseEditProfileModal();
        setCurrentUser((prevItems) => {
          return { ...prevItems, ...res };
        });
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  const [weatherData, setWeatherData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleOpenAddItemModal = () => {
    setIsAddModalOpen(true);
  };
  const handleOpenisLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };
  const handleOpenEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setIsAddModalOpen(false);
  };
  const handleCloseisLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemModalOpen = (id, name, weather, link, owner) => {
    console.log("Modal opening with:", id, name, weather);
    setIsItemModalOpen(true);
    setSelectedItem({ id, name, weather, link, owner });
  };

  const handleItemModalClose = () => {
    setIsItemModalOpen(false);
  };
  useEffect(() => {
    apiForWeather
      .getInfo()
      .then((res) => {
        setWeatherData(res);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = getToken();
    console.log("use effect for getItems. JWT:", jwt);
    if (!jwt) return;

    apiClothingItems
      .getItems(jwt)
      .then((res) => {
        setClothingItems(res);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitProvider>
          <Header
            weatherData={weatherData}
            onOpenAddItemModal={handleOpenAddItemModal}
            onOpenLoginModal={handleOpenisLoginModal}
            onOpenSignUpModal={handleOpenSignUpModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  defaultClothingItems={clothingItems}
                  onCardClick={handleItemModalOpen}
                  onCardLike={handleCardLike}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onOpenModal={handleOpenAddItemModal}
                    weatherData={weatherData}
                    defaultClothingItems={clothingItems}
                    onCardClick={handleItemModalOpen}
                    onOpenEditProfileModal={handleOpenEditProfileModal}
                    onCloseEditProfileModal={handleCloseEditProfileModal}
                    signOut={handleSignOut}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CurrentTemperatureUnitProvider>
        <Footer />
        <ItemModal
          isOpen={isItemModalOpen}
          onClose={handleItemModalClose}
          name={selectedItem?.name}
          weather={selectedItem?.weather}
          link={selectedItem?.link}
          owner={selectedItem?.owner}
          handleDelete={() => handleDeleteItem(selectedItem?.id)}
        />

        {isAddModalOpen && (
          <AddItemModal
            onClose={handleCloseAddItemModal}
            isOpen={isAddModalOpen}
            onAddItem={handleAddItem}
          ></AddItemModal>
        )}
        {isSignUpModalOpen && (
          <RegisterModal
            onClose={handleCloseSignUpModal}
            isOpen={isSignUpModalOpen}
            onSignUp={handleSignUp}
            onOpenLoginModal={handleOpenisLoginModal}
          ></RegisterModal>
        )}
        {isLoginModalOpen && (
          <LoginModal
            onClose={handleCloseisLoginModal}
            isOpen={isLoginModalOpen}
            onLogIn={handleLogIn}
            onOpenSignUpModal={handleOpenSignUpModal}
          ></LoginModal>
        )}
        {isEditProfileModalOpen && (
          <EditProfileModal
            onClose={handleCloseEditProfileModal}
            isOpen={isAddModalOpen}
            onSubmitEditProfile={handleEditProfile}
            onOpenEditProfileModal={handleOpenEditProfileModal}
            onCloseEditProfileModal={handleCloseEditProfileModal}
          ></EditProfileModal>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
