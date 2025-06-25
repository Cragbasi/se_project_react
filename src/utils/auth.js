export class ApiForAuthentication {
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

  signUp(name, avatar, email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  signIn(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserInfo = (token) => {
    // Send a GET request to /users/me
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Specify an authorization header with an appropriately
        // formatted value.
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  updateUserProfile = (name, avatar, token) => {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH", // PATCH is used for updating existing data
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  };
}
