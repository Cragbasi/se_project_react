export class WeatherApi {
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

  getInfo() {
    return fetch(`${this._options.baseUrl}`)
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        // Pearse Api data for what's relevant to this project
        const weatherData = { city: res.name, temperature: res.main.temp };
        // Make weather type
        if (weatherData.temperature >= 86) {
          weatherData.weatherType = "hot";
        } else if (weatherData.temperature >= 66) {
          weatherData.weatherType = "warm";
        } else {
          weatherData.weatherType = "cold";
        }
        // console.log(weatherData);
        return weatherData;
      });
  }
}
