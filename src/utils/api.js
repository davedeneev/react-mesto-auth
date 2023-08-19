class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getUser() {
        const link = `${this._baseUrl}/users/me`;
        return fetch(link, {
            headers: this._headers,
        })
            .then(this._handleResponse);
    };

    getInitialCards() {
        const link = `${this._baseUrl}/cards`;
        return fetch(link, {
            headers: this._headers,
        }).then(this._handleResponse);
    }

    addCard(card) {
        const link = `${this._baseUrl}/cards`;
        return fetch(link, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(card),
        }).then(this._handleResponse);
    };

    deleteCard(data) {
        const link = `${this._baseUrl}/cards/${data.id}`;
        return fetch(link, {
            headers: this._headers,
            method: "DELETE",
        }).then(this._handleResponse);
    };

    changeLikeCardStatus(data) {
        const link = `${this._baseUrl}/cards/likes/${data.id}`;
        return fetch(link, {
            method: data.isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        }).then(this._handleResponse);
    }

    editUserProfile(user) {
        const link = `${this._baseUrl}/users/me`;
        return fetch(link, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(user),
        }).then(this._handleResponse);
    };

    editUserAvatar(user) {
        const link = `${this._baseUrl}/users/me/avatar`;
        return fetch(link, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(user),
        }).then(this._handleResponse);
    };
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
    headers: {
        authorization: 'aac91b4b-cd9c-449e-a05e-4878339d70cf',
        'Content-Type': 'application/json'
    }
});

export default api;