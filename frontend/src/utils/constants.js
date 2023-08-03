//параметры для валидации
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const buttonEditProfile = document.querySelector(
  ".profile__button-edit"
); //кнопка редактирования профиля
export const formEditProfile = document.forms["editForm"]; //форма редактирования попапа
export const buttonAddCard = document.querySelector(".profile__button-add"); //кнопка добавления карточки
export const formAddCard = document.forms["addCardForm"]; //форма редактирования попапа
export const buttonAvatar = document.querySelector(".profile__button-avatar"); //кнопка редактирования аватара
export const formAvatar = document.forms["avatarForm"]; //форма аватара
