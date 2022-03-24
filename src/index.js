function formatDate(timestamp) {
  // calculates the date for last update
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated ${day} ${hours}:${minutes}`;
}

//relates to forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="${changeIcon(forecastDay.weather[0].description)}"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7bcf0da6ca80b20c501d86d32cc003a7";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

//changing the inner HTML to match current weather data
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#currentDate");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    changeIcon(response.data.weather[0].description)
  );

  getForecast(response.data.coord);
}

function search(cityname) {
  let apiKey = "7bcf0da6ca80b20c501d86d32cc003a7";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayTemperature);
  // ^ adds in axios so you can connect with Open weather for data
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
//search funciton above

//converting the temp to Celsius and/or Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // below changes link (underline) when clicking F or C
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//current location button
function getWeatherLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7bcf0da6ca80b20c501d86d32cc003a7";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(displayTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

//my attempt at changing the temp icons-
function changeIcon(iconChange) {
  let icon = "";
  if (
    iconChange === "rainy" ||
    iconChange === "rain" ||
    iconChange === "light rain" ||
    iconChange === "drizzle" ||
    iconChange === "moderate rain" ||
    iconChange === "showe rain" ||
    iconChange === "heavy rain"
  ) {
    icon = "images/rain.png";
  } else if (
    iconChange === "cloudy" ||
    iconChange === "overcast clouds" ||
    iconChange === "clouds" ||
    iconChange === "few clouds" ||
    iconChange === "scattered clouds" ||
    iconChange === "broken clouds"
  ) {
    icon = "images/cloudy.png";
  } else if (
    iconChange === "snow" ||
    iconChange === "snowy" ||
    iconChange === "moderate snow" ||
    iconChange === "light snow" ||
    iconChange === "heavy snow" ||
    iconChange === "snow storm"
  ) {
    icon = "images/snow.png";
  } else if (
    iconChange === "sunny" ||
    iconChange === "hot" ||
    iconChange === "clear sky" ||
    iconChange === "sun"
  ) {
    icon = "images/sun.png";
  } else if (
    iconChange === "windy" ||
    iconChange === "wind" ||
    iconChange === "light wind" ||
    iconChange === "moderate wind" ||
    iconChange === "heavy wind" ||
    iconChange === "light winds" ||
    iconChange === "very windy"
  ) {
    icon = "images/windy.png";
  } else if (
    iconChange === "stormy" ||
    iconChange === "mist" ||
    iconChange === "misty" ||
    iconChange === "hazy" ||
    iconChange === "storms" ||
    iconChange === "storm" ||
    iconChange === "thunderstorm" ||
    iconChange === "thunderstorms"
  ) {
    icon = "images/lightning.png";
  } else {
    icon = "images/rainbow.png";
  }
  return icon;
}

search("");
