import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      buttonText={props.onLoading ? "Сохранение..." : "Сохранить"}
      formName="editForm"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        name="name"
        value={name || ""}
        onChange={handleNameChange}
        id="name"
        className="popup__input popup__input_el_name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error name-error"></span>
      <input
        name="about"
        value={description || ""}
        onChange={handleDescriptionChange}
        id="description"
        className="popup__input popup__input_el_description"
        type="text"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error description-error"></span>
    </PopupWithForm>
  );
}
