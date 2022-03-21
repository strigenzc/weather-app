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

  let dayList = date.getDay();
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

function displayTemperature(response) {
  //changing the inner HTML to match current weather data
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
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
changeIcon(iconElement, response.data.weather[0].description);
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

//current location button

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


//my attempt at changing the temp- does not work
 function changeIcon(iconElement, iconChange) {
   if (
     iconChange === "rainy" ||
     iconChange === "rain" ||
     iconChange === "light rain" ||
     iconChange === "drizzle" ||
     iconChange === "heavy rain"
   ) {
     iconElement.setAttribute(
       "src",
       `https://lh3.googleusercontent.com/4logCL4FCDL0hTgQ98_mPcRaIuUwJ9gld0rY5cPLzSVaBjvWNFiMvpitqdecfhP1aL4CmlR1xB885LwhiUPIbya4sz6ZD9iqDHaRvOCF5FXaFi4hOZDyDKFDWqoITBqOIJ4a9f9W7Rtul9gsdF_1Jao2PIbBb-mg-3aI0fc4iNeuaax9EceIuJULzhp4cSZxJh4OJ1V914nqgtnMcDcGu4Pr2isoNPuftK0uRM2plXSCvbK-gTm6L2R3wexbKJ6_hcrIDtOSv4eomqE64oPia1Xqy3YqdtrwbtbHCJl7972Qioz5Xbf5dcwW8Wb4i54czsy2sWyEbXoCUxVaCY_BGiWn7-6_cwkoGlKUla8mkxzEyM-KS56sHW4t36dZ02oOlMfeFyXJ-iSuggcA_hThnNGlnxeQL-jTcr5UXMTfii0Mpv_3vHXKyYXkhE4Aesbfr_3AGBK2vz6EwuaDiGZhurMlQOtcVzui_y9wTpfBheMo_wY81cKGGMNVvQV0A75ZpV-jhc2MXDDQyzoDqVQtUNpMWybU5lETWa-q9RrzN3t5vWKjGK5JoXKWuy5_pSRtkWKnlnE6RLW-u4l_2vIPmx9tbw-k7QTgKk2O4ACAXZqsnX0cU3GyzYgDd2kjh6EawMZ2_QgGq6eaOxn54sC9IkdP6BK90eiHNYqD4hmT5cbf6Kz1PuWDDX9wvtDv0DxetgjaEIUBP-73rSKPorE2vj1o6QcRarH1kvhGGxdd86lelqmfh3vzuVzdTH1Va-Q=s100-no?authuser=0`
     );
   } else if (
     iconChange === "cloudy" ||
     iconChange === "overcast clouds" ||
     iconChange === "clouds" ||
     iconChange === "few clouds" ||
     iconChange === "scattered clouds" ||
     iconChange === "broken clouds"
   ) {
     iconElement.setAttribute(
       "src",
       `https://lh3.googleusercontent.com/An2WTE2m0qSTPMydtcyYjum9ixC6MAmnSKo8Cj60X95O4c4S92KnX1xDztK_fwoffU3j0VqSnoN9vzKYIYziLx9-gT6XosANwjfcoSZiHF9_4NH6pqy2ptz5hfFiN81cctRcy4CWQ7bpsym3jyAVKKW9qj7VkhF-1g-5W7tGvREK4z1MtZHbFPvJE6O4XtWK88lNqS-jOwPoS_olWayTczV0jjYzehbR2tATsEXOA9gB1e9LTr9Q7RCjNCTsCIgCdJG64axsKM3dgbaW6kOwnYHogIjixwKALIiAQ3-XkZw2S9WU1Ue1QwiTjBb96bi9b6CcDE_pyPi8kpz5CgcrP6mVqr6sslwu72eIGAnQZq2eGEgV_UOY86LsSd-6s8cm0pe20wc9aoEPQtpMaQ7eB4plYpvke2UAubP1R4vFL4MAfdLEve7bs3ZDETnwyM9aIHQTGSFAl1VEqNT2DGkvp4loCcXhHfpRX-siKTnBtkm2OeZcB8PneZGAnZuQq026d0e3tUbN0ltBWsDT5-TzBh801TaL-UyTLO-xSKYF8XPL8Eb_zugevW6COLpcVY8vo7AAGazNjlrduQuuhzST6-ABHvhJCe_4QKYNU6nwwxUZt4_JziNB74qoAqsHO4GS7Fa2xV9qAlJqcKVkvrusgAv7vCBWUZIgsbnvhcXpPSNKkdY55_wId4veUWjzK0mM6rvisL7fYAs4DeXN0-8WFcXkzu9H9RCFrOs9Js-GAvQWUaBt-mLZgDaaddCHr-c=s100-no?authuser=0`
     );
   } else if (
     iconChange === "snow" ||
     iconChange === "snowy" ||
     iconChange === "snow storm"
   ) {
     iconElement.setAttribute(
       "src",
       `https://lh3.googleusercontent.com/qV1kUILicKFvvS-ER_wTdxGUti9S3-F_QVtXH_gBDu0gQfgaXvHrHaQ6r3EGxtPvJxeuvSKHONBaGqwql00upWFx5JjBC2jAbtJml8yoH3T61zQYu50MKS_BGOsTJ_ZwCR14HTKIpoQ04UYZg6MDkLvi0nxQlEy_z1f1nwMKU5t0vPFzBXTGQXZem-touZ69yowLNf__rZ1VdodiJcWGEv1X6yvU1BQ-gKBqaQOCWeS-ShBQOCZHPrM3wlvD-wpjxxn_vLpToyY5tXNUfsJ2f5PxWJeQk2G5HPrf3bn-QRIws0_TvXI4odLDslskCfXpL89F9uy7YTq6ebLADhO0rFqf3_fGcdfaS-A9ltKZ5ZTzgpk5lFmyrxzTFzLGngydA6TD3oIEJu_K-qsvWODQa0yvy95xRpCNbo79KPX7g9qc9AV7hvPEbQ_7DTpGhrOuOzAW-aM_LTDApwLZX1IrgbierxC94tQA6ExvW2hgi4GyowFPKjiy9SbN0c50x4yeSKMF92hFMjXFlG0rFCrJiqGOHeey-OfGSfMSQ6p3cVWso74JDelDZSjBkjs8p116H5gHuhIcY0A13DDh_pSwt3UdbYf4gDoPftp_ybRyObe0EwjVX6fjH3nFT5AoERYV8Fdq0HqmL1yVBfX0TqAwoQgJsc1dGKExVMEL5-x5wf8CofXcX2LAdcGklHv3U9u_WMr6MprNZclJGbmg8dO6TtcsmxLeA_V-c1-ZzHBxBcsr7KQo3CtAtlioAsGr4mw=s100-no?authuser=0`
     );
   } else if (
     iconChange === "sunny" ||
     iconChange === "hot" ||
     iconChange === "clear sky" ||
     iconChange === "sun"
   ) {
     iconElement.setAttribute(
       "src",
       `https://lh3.googleusercontent.com/PYKqBs6A1Ea706DKmXpD4NAvuaL50N0DUVpVlzFI2iKnc2cPTBklB1OCp5liVXXYF64fL5T4QbRutwYBSXhTr1B8VXjcGj4NgvGU8fJ2NlN3iZuQPGRctIbQK8Y_EtAhcEEtR-4LD3KeYfhYfvEyy_p77Il5wM-6pj6WHhZMYgvDQ7Pca2-O8OyD_8rH9dlm-dEDKw-objApDV9MgJOjSS9VXdkije5VSC3sTM4Ny7yrtKJpwQvQDMFO2J7KuEr8h5oxeuUKXvIILS5a1IcKJEjxOE6SfxmVwl1JSfG-Dm9MyYUB_P4pyC5wpyyBAkZaPdCJSV5ws32c5CyCO6Hg7oo4nSw89wLMHGzP7pogm2CEsn_ZUIyfanBKi-2bEt43V-k_i5bRXwphS2280nqurPINq7bmUB9euLZo554ESNWq_3yu1zrPnAP_RMfD8ENdHyH-M9FS_IobtrrNiN7XLtJ1S4fdwaoUPt8dBb4Ki8bjABD1RDkHmAcsbClzyzR1T4V8Of4EeMZV3bdhPkhw-EhDYJ88UECP6MHDyJwz6sR3U4WW4bJsWPAFZCaIYcnXtChICdega0U25m8pXxoeh5yFo3j4cPG2v6f3cbFpGiamcMSbY1-7QTDFm937Xef2QWhEI8Q6_0DnYHS9FjRmuajkKnl0NK0zUHGk5UW3t2G2lW3HXXQUfb4riGtC-peWBTO5kJAv7wJg7Hadwy8GJ7fs4lKjlVQo7q9WJvLSZYF5E6LfSY-BOefHT3nZqGo=s100-no?authuser=0`
     );
   } else if (
     iconChange === "stormy" ||
     iconChange === "storms" ||
     iconChange === "storm" ||
     iconChange === "thunderstorms"
   ) {
     iconElement.setAttribute(
       "src",
       `https://lh3.googleusercontent.com/An2WTE2m0qSTPMydtcyYjum9ixC6MAmnSKo8Cj60X95O4c4S92KnX1xDztK_fwoffU3j0VqSnoN9vzKYIYziLx9-gT6XosANwjfcoSZiHF9_4NH6pqy2ptz5hfFiN81cctRcy4CWQ7bpsym3jyAVKKW9qj7VkhF-1g-5W7tGvREK4z1MtZHbFPvJE6O4XtWK88lNqS-jOwPoS_olWayTczV0jjYzehbR2tATsEXOA9gB1e9LTr9Q7RCjNCTsCIgCdJG64axsKM3dgbaW6kOwnYHogIjixwKALIiAQ3-XkZw2S9WU1Ue1QwiTjBb96bi9b6CcDE_pyPi8kpz5CgcrP6mVqr6sslwu72eIGAnQZq2eGEgV_UOY86LsSd-6s8cm0pe20wc9aoEPQtpMaQ7eB4plYpvke2UAubP1R4vFL4MAfdLEve7bs3ZDETnwyM9aIHQTGSFAl1VEqNT2DGkvp4loCcXhHfpRX-siKTnBtkm2OeZcB8PneZGAnZuQq026d0e3tUbN0ltBWsDT5-TzBh801TaL-UyTLO-xSKYF8XPL8Eb_zugevW6COLpcVY8vo7AAGazNjlrduQuuhzST6-ABHvhJCe_4QKYNU6nwwxUZt4_JziNB74qoAqsHO4GS7Fa2xV9qAlJqcKVkvrusgAv7vCBWUZIgsbnvhcXpPSNKkdY55_wId4veUWjzK0mM6rvisL7fYAs4DeXN0-8WFcXkzu9H9RCFrOs9Js-GAvQWUaBt-mLZgDaaddCHr-c=s100-no?authuser=0`
     );
   } else {
     iconElement.setAttribute(
       "src",
       `https://lh3.googleusercontent.com/NgQ15ljKPnbptSW7yD0AB96LaWH4rG-dAsb5d0vJu8xRiOEgmfeTHkWvCfHE-86bmZLm34OFBRsmNiFn2emFvGaTmwSfXZpd8XhbQsdfyJYPVCzXh1eOVfOSKGwuokU2_mg1SwKlL8kfQpo04aDMa5gagyS0M9PdhWDk4i7k2fQFQS7kfriRRiiaaSatz_vNNgyo_G0b_3JMm7ozoj5DYSQV74nFz_RaqNyzSdDD8zjMxewD_xlb_siYdf02QKJ052aWoimNKe8-IXjVVaDOYZc20cwfE2b7smlYDc7FKFIuHl6K2ti0xoNcqtmMyxtHwI4vWElDJMxut5d1RLKG2QwxyL1Ecq0-jB4GimhwukUhA_xeBnpuZ-kpbS4KSFRdLVYiFrqNGYqtjyKUtRb5BwIS1aHDPaugApwu5qV7U7UrJAtcJ0KEktnpBVY523sc3SisB_izyqF0azAy537fANYxWmBmM9aJhG13ctqguE7B0540i9oVvSoCWA-5et3sE0Pq-IDLCg7PBiDVhFe0Lz08gLsH6A4tUVHTnRJZCk3Q6Bhr93DrhMIjYMJoRCAOGUYJbugGkjz9j_CtIu85PSn7Xmp36_1IXTv5CjbMLk6E0yaRev3E9Hw1eCoZZQRKYMRlJmuH-HPbHNi0giUhj1q_k9cuwJDkkpfIiQr2xBvp5xMBUEku_iddN9ogZjHHttdmbkWhFvqQPpvauQa4hgOWLPqnLObtPxDRCdzormbI53DIiPLwquBaF1j5yhQ=s100-no?authuser=0`
     );
   }
 }