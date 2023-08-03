import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddNewPlacePopup from "./AddNewPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);

  //проверяем авторизацю
  const [isLoggedIn, setLoggedIn] = useState(false);

  //попап при регистрации
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  //данные юзера после авторизации
  const [userData, setUserData] = useState(null);

  //стейт для проверки регистрации
  const [isRegistered, setRegistered] = useState(false);

  //навигация
  const navigate = useNavigate();

  //константа открытых попапов
  const openedPopups =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard;

  //выход
  function logOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  //функция регистрации
  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        setRegistered(true);
        setInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setRegistered(false);
        setInfoTooltipOpen(true);
      });
  }

  //функция логина
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setUserData(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //проверка токена
  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    auth
      .getContent(jwt)
      .then((data) => {
        if (!data) {
          return;
        }
        setLoggedIn(true);
        setUserData(data.data.email);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cardInfo]) => {
        setCurrentUser(userInfo);
        setCards(cardInfo);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  // function handleEscClose(evt) {
  //   if (evt.key === "Escape") {
  //     closeAllPopups();
  //   }
  // }

  //закрытие на ESC
  useEffect(() => {
    const close = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    if (openedPopups) {
      window.addEventListener("keydown", close);
      return () => {
        window.removeEventListener("keydown", close);
      };
    }
  }, [openedPopups]);

  //открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // function handleInfoTooltipOpen() {
  //   setIsInfoTooltipOpen(true);
  // }

  // function handleLogin() {
  //   setLoggedIn(true);
  // }

  //лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //удаление
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //изменение информации профиля
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //изменение аватара
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userData={userData} logOut={logOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  footer={Footer}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <AddNewPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdatePlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
