// import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Фото владельца профиля"
          />
          <button
            className="profile__button-avatar"
            onClick={onEditAvatar}
            type="button"
            aria-label="Кнопка смены аватара"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            className="profile__button-edit"
            onClick={onEditProfile}
            aria-label="Кнопка редактирования"
            type="button"
          ></button>
        </div>
        <button
          className="profile__button-add"
          onClick={onAddPlace}
          aria-label="Кнопка добавления"
          type="button"
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
