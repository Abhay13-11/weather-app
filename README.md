# Assignment 1 — Weather App

A JavaScript weather application built with HTML, CSS and JavaScript using the OpenWeatherMap Current Weather API.

## Features

- City name input
- Current temperature in Celsius
- Humidity
- Weather condition
- Feels-like temperature
- Wind speed
- Atmospheric pressure
- Visibility
- Weather icon
- API error handling
- Responsive clean card UI
- API key saved locally in the browser

## How to use

1. Create an account at OpenWeather and get an API key.
2. Open `index.html` using VS Code Live Server.
3. Paste your API key into the API key field.
4. Click `Save Key`.
5. Enter a city such as `Greater Noida`.
6. Click `Search Weather`.

## API request

The app uses the OpenWeather current weather endpoint with:
- `q` for city name
- `appid` for API key
- `units=metric` for Celsius

Official documentation:
https://openweathermap.org/api/current

## GitHub

```bash
git init
git add .
git commit -m "Build weather app with OpenWeather API"
git branch -M main
git remote add origin https://github.com/Abhay13-11/weather-app.git
git push -u origin main
```

## Important

Do not commit a real secret API key into JavaScript source code. This project intentionally asks for the key in the UI and stores it only in browser localStorage.
