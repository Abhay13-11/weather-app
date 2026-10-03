const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKeyBtn");

const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

const locationName = document.getElementById("locationName");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const updatedAt = document.getElementById("updatedAt");
const country = document.getElementById("country");

const weatherIcon = document.getElementById("weatherIcon");
const weatherFallbackIcon = document.getElementById("weatherFallbackIcon");

const API_BASE = "https://api.openweathermap.org/data/2.5/weather";
const SAVED_KEY = "openweather_api_key";

const savedApiKey = localStorage.getItem(SAVED_KEY);

if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
}

function setMessage(text, type = "") {
    message.textContent = text;
    message.className = `message ${type}`.trim();
}

function saveApiKey() {
    const key = apiKeyInput.value.trim();

    if (!key) {
        localStorage.removeItem(SAVED_KEY);
        setMessage("API key removed from this browser.", "success");
        return;
    }

    localStorage.setItem(SAVED_KEY, key);
    setMessage("API key saved locally. You can search for a city now.", "success");
}

saveKeyBtn.addEventListener("click", saveApiKey);

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    const apiKey = apiKeyInput.value.trim() || localStorage.getItem(SAVED_KEY);

    if (!apiKey) {
        setMessage("Enter your OpenWeather API key first.", "error");
        apiKeyInput.focus();
        return;
    }

    if (!city) {
        setMessage("Enter a city name.", "error");
        cityInput.focus();
        return;
    }

    setMessage(`Fetching current weather for ${city}...`);
    weatherCard.classList.add("hidden");

    try {
        const params = new URLSearchParams({
            q: city,
            appid: apiKey,
            units: "metric"
        });

        const response = await fetch(`${API_BASE}?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message
                    ? data.message.charAt(0).toUpperCase() + data.message.slice(1)
                    : "Unable to fetch weather data."
            );
        }

        renderWeather(data);
        setMessage(`Weather loaded successfully for ${data.name}.`, "success");
    } catch (error) {
        setMessage(
            `${error.message}. Check your city name and API key, then try again.`,
            "error"
        );
    }
});

function renderWeather(data) {
    locationName.textContent = data.name;
    country.textContent = data.sys?.country || "—";

    const weather = data.weather?.[0];

    condition.textContent = weather?.description || "Unavailable";
    temperature.textContent = Math.round(data.main.temp);
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;

    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind?.speed ?? "—"} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    const visibilityKm =
        typeof data.visibility === "number"
            ? (data.visibility / 1000).toFixed(1)
            : "—";

    visibility.textContent = `${visibilityKm} km`;

    const iconCode = weather?.icon;

    if (iconCode) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = weather?.description || "Weather icon";
        weatherIcon.classList.remove("hidden");
        weatherFallbackIcon.classList.add("hidden");
    } else {
        weatherIcon.classList.add("hidden");
        weatherFallbackIcon.classList.remove("hidden");
    }

    updatedAt.textContent = `Updated ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })}`;

    weatherCard.classList.remove("hidden");
}
