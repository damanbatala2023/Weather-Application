const apiKey = "f561e189d96895a529ecc20d9739d2a7";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.getElementById("error-msg");
const loading = document.getElementById("loading");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const card = document.querySelector(".card");

// Function to check weather for a given city
async function checkWeather(city) {
  if (!city) {
    displayError("Please enter a city name.");
    return;
  }

  try {
    loading.style.display = "block";
    error.style.display = "none";
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    loading.style.display = "none";

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    displayError("City not found. Please check the spelling.");
    shakeCard(); // Apply shake animation
    searchBox.value = ""; // Clear the input box
  }
}

// Display weather data in the UI
function displayWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

  const weatherCondition = data.weather[0].main;
  const iconMap = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Default: "images/default.png",
  };
  weatherIcon.src = iconMap[weatherCondition] || iconMap.Default;

  weather.style.display = "block";
  error.style.display = "none";
}

// Display error message and hide weather data
function displayError(message) {
  errorMsg.innerText = message;
  error.style.display = "block";
  weather.style.display = "none";
}

// Add a shake animation to the card
function shakeCard() {
  card.classList.add("shake");
  setTimeout(() => {
    card.classList.remove("shake");
  }, 500); // Remove shake class after animation duration
}

// Event listener for Enter key in the input field
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// Load Kathmandu's weather data by default
window.addEventListener("load", () => {
  checkWeather("Kathmandu");
});
