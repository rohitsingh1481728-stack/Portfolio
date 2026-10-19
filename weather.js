const weatherButton = document.getElementById("weather-button");
const weatherStatus = document.getElementById("weather-status");
const weatherDetails = document.getElementById("weather-details");
const weatherPlace = document.getElementById("weather-place");
const weatherTemperature = document.getElementById("weather-temperature");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const openWeatherApiKey = "fe1b2de2a0e968d422386231dab17397";

weatherButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        weatherStatus.textContent = "Location is not supported by this browser.";
        return;
    }

    weatherButton.disabled = true;
    weatherStatus.textContent = "Finding your local weather…";
    weatherDetails.hidden = true;

    navigator.geolocation.getCurrentPosition(loadWeather, (error) => {
        const messages = {
            1: "Location permission was denied. Allow location access and try again.",
            2: "Your location could not be determined. Please try again.",
            3: "Location lookup timed out. Please try again."
        };
        weatherStatus.textContent = messages[error.code] || "Could not get your location. Please try again.";
        weatherButton.disabled = false;
    }, { timeout: 10000, maximumAge: 300000 });
});

async function loadWeather(position) {
    const { latitude, longitude } = position.coords;
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.search = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        appid: openWeatherApiKey,
        units: "metric"
    });

    try {
        const response = await fetch(url);
        const weather = await response.json();

        if (!response.ok) {
            throw new Error(response.status === 401
                ? "The weather service rejected the API key."
                : response.status === 429
                    ? "The weather service is busy. Please try again later."
                    : "Weather information is currently unavailable.");
        }

        weatherPlace.textContent = weather.name;
        weatherTemperature.textContent = `${Math.round(weather.main.temp)}°C`;
        weatherDescription.textContent = weather.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        weatherIcon.alt = weather.weather[0].description;
        weatherStatus.textContent = "Current conditions";
        weatherDetails.hidden = false;
    } catch (error) {
        weatherStatus.textContent = error.message || "Could not load weather. Please try again.";
    } finally {
        weatherButton.disabled = false;
    }
}
