export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
    >
      <figure className="popup__image-container">
        <button
          className="popup__button-exit popup__close"
          onClick={onClose}
          type="button"
          aria-label="Кнопка закрытия"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-heading">{card.name}</h2>
      </figure>
    </div>
  );
}
