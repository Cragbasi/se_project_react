export class ApiForClothingItems {
  constructor(options) {
    // constructor body

    this._options = options;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${response.status}`);
  }
  getItems(token) {
    return fetch(`${this._options.baseUrl}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  postItem(name, weather, imageUrl, token) {
    return fetch(`${this._options.baseUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Specify an authorization header with an appropriately
        // formatted value.
        Authorization: `Bearer ${token}`,
      },
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        weather,
        imageUrl,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  deleteItem(id, token) {
    return fetch(`${this._options.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addCardLike = (cardId, token) => {
    return fetch(`${this._options.baseUrl}/${cardId}/likes`, {
      method: "PUT", // PUT is often used for adding likes
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  removeCardLike = (cardId, token) => {
    return fetch(`${this._options.baseUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  };
}
