function displayTemperature(response) {
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let dateElement= document.querySelector("#currentDate");
let descriptionElement= document.querySelector("#description");
let windElement= document.querySelector("#wind-speed");
let humidityElement= document.querySelector("#humidity")
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
dateElement.innerHTML = "17th of March";
descriptionElement.innerHTML = response.data.weather[0].description;
windElement.innerHTML = Math.round(response.data.wind.speed);
humidityElement.innerHTML = Math.round(response.data.main.humidity);
console.log(response.data);
}

let apiKey = "7bcf0da6ca80b20c501d86d32cc003a7";
let cityname = "New York"
let units = "metric"
let apiURL =
  `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=${units}`;

  console.log(apiURL);
  axios.get(apiURL).then(displayTemperature);




