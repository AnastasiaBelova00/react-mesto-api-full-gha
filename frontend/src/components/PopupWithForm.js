import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  formName,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      // onClick={onClose}
    >
      <div className="popup__container">
        <button
          className="popup__button-exit"
          onClick={onClose}
          type="button"
          aria-label="Кнопка закрытия"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={formName} onSubmit={onSubmit}>
          {children}

          <button className="popup__button-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
