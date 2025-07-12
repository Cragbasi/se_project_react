# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

The What To Wear (WTWR) app is designed to help users manage a database of clothing items based on weather conditions. Users can organize clothing into categories for hot, warm, and cold weather, ensuring they always have the right outfit for any forecast.

The app retrieves real-time weather data using a weather API based on geographic coordinates and displays relevant clothing suggestions. This back-end project establishes the server, handling API requests, user authentication, and database operations.

## Links

- [Front-end](https://github.com/Cragbasi/se_project_react)

- [Back-end](https://github.com/Cragbasi/se_project_express)

- [Domain name](www.cragbasi.blinklab.com)

## Notes

1. Can user add clothing item immediately after signup (that is without logging in)? Right now user can not because a token is NOT generated during signup to pass authentication. After signup and user refreshings page manually, the user is signed out by default.
2. After log in, user can see other user's clothing items on main page. User can see only his/her clothing items on profile page.
3. After log out, then sign up by a new user, the new user can see other user's clothing items but can not add an item just yet (Forbidden) because of Note 1
