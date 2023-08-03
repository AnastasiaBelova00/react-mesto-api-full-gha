import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddNewPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  //очистка инпутов
  useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdatePlace({ title, link });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={props.onLoading ? "Сохранение..." : "Создать"}
      formName="addCardForm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        value={title}
        onChange={handleTitleChange}
        id="title"
        className="popup__input popup__input_el_name-card"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error title-error"></span>
      <input
        name="link"
        id="link"
        value={link}
        onChange={handleLinkChange}
        className="popup__input popup__input_el_link-card"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  );
}
