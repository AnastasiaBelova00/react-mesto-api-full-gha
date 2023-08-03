class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //универсальная проверка запроса на сервер
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  //изменяем информацию пользователя
  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkStatus);
  }

  //изменяем аватар пользователя
  changeUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkStatus);
  }

  //получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  //добавляем новую карточку
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._checkStatus);
  }

  //добавляем/убираем лайк
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  // //убираем лайк
  // deleteLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then(this._checkStatus);
  // }

  //удаляем карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:4000",
  headers: {
    authorization: "9d9d46b1-d674-4200-a18f-5deb215f4e52",
    "Content-Type": "application/json",
  },
});
