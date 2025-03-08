const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "ef0e0f4b81345d6f4ca327462d6eed66";

let searchin = document.querySelector(".search input");
let searchbtn = document.querySelector(".search-icon");
let weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    let data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";
    searchin.value = ""; // Clear input field

    // Set the correct weather icon
    let weatherCondition = data.weather[0].main;
    if (weatherCondition === "Clouds") {
      weatherIcon.src = "img/cloud100.png";
    } else if (weatherCondition === "Clear") {
      weatherIcon.src = "img/sun.png";
    } else if (weatherCondition === "Rain") {
      weatherIcon.src =
        "img/sun-rain-raining-falling-flat-icon-vector-removebg-preview.png";
    } else if (weatherCondition === "Drizzle") {
      weatherIcon.src = "img/Drizzle.png";
    } else if (weatherCondition === "Mist") {
      weatherIcon.src = "img/Artboard_14-512.webp";
    } else {
      weatherIcon.src =
        "img/png-transparent-weather-forecasting-thD-removebg-preview.png"; // A default icon if no match
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching weather data.");
  }
}

searchbtn.addEventListener("click", () => {
  if (searchin.value.trim() !== "") {
    checkWeather(searchin.value);
  } else {
    alert("Please enter a city name!");
  }
});
