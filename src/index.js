function formatDate(timestamp) {
    // calculates the date for last update
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes ();
    if (minutes <10){
        minutes = `0${minutes}`;
    }

    let dayList = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `Last updated ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    //changing the inner HTML to match current weather data
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let dateElement= document.querySelector("#currentDate");
let descriptionElement= document.querySelector("#description");
let windElement= document.querySelector("#wind-speed");
let humidityElement= document.querySelector("#humidity")
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
descriptionElement.innerHTML = response.data.weather[0].description;
windElement.innerHTML = Math.round(response.data.wind.speed);
humidityElement.innerHTML = Math.round(response.data.main.humidity);
console.log(response.data);
}

let apiKey = "7bcf0da6ca80b20c501d86d32cc003a7";
let cityname = "Chicago";
let units = "metric";
let apiURL =
  `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=${units}`;

  console.log(apiURL);
  axios.get(apiURL).then(displayTemperature);
  // ^ adds in axios so you can connect with Open weather for data






