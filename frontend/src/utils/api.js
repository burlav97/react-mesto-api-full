import { getToken }  from './token';

export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  resFetch(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      }
    }).then((res) => this.resFetch(res));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      }
    }).then((res) => this.resFetch(res));
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => this.resFetch(res));
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers:{
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      }
    }).then((res) => this.resFetch(res));
  }

  editUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => this.resFetch(res));
  }

  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(avatar),
    }).then((res) => this.resFetch(res));
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers:{
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      },
    }).then((res) => this.resFetch(res));
  }

  putDislike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        'authorization': `Bearer ${getToken()}`
      },
    }).then((res) => this.resFetch(res));
  }
}
export const api = new Api({
  baseUrl:  'https://api.mestoburlav97.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});
