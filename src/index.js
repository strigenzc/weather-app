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
  iconElement.setAttribute(
      "alt", response.data.weather[0].description);
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

//my attempt at changing the temp- does not work
//function changeIcon(response) {
 //   let iconChange = response.data.[0].description;
  //  if (iconChange === rainy || rain)  {
   //      iconElement.innerHTML = "https://lh3.googleusercontent.com/JtsNlr4MwVWIC4JrPYPvRDzH57XK5IZOalFiSbPArKdxfh9tnb0G9C7LvPswwKDbl1og6SEkHbVax188JJ4IU9jScDEKUFXBynpR-5wlzXRwQ4p-Epxgrax-lIUtAUIF3zqUfCytrYiEQDXhrs9o1kfKMAGQpb0nddYTtGzymuIqylEcxD6oeU3evUlZPTU0rpxEWRFTR-oR7FFsJDrNo5uOQlGDScIdErNvA0t7D52Jzk-52kF2GuS0grLRpJXV-ZAUNxybusWNRcT1vPsKilPlbz5lgLaKw4SYEpV7jDvruIQwUiNOXT2tYbPQF9WB2kC4Lb-H-CcGfTyY8ZjOaOYNzK8CUn0xRGcajmvdjZJOY-_1GJnkS23HDxgEYyMlHaC5tIfJcAO8eXRxCBDp5W8O7gA-ejAU9GPaBKfXa_9HujM54qvzWjedE61fgRm0UIVy9LcxCZtoQj44F2ZhCThYQ0bPVX9xyBVNIf2nZqTTj6k7wJCq6xDHNSTwXXGSz8q8a3K3Ao0MWddMUmFBGAg0_WXjmWvBOgKURgOEu4QVywagOpkGAD_Q1jJLAZFjFzvr1LUKH1RpCg7cZlsfzvxfSZmlOVixhkqIoH99xP-IV2pwUr9oWXwFDgg-QkdpB2lRYzEsLNPOulnfY7yNPXznNYkV4znDSiCcqWQsNDCMixv9wofnu-3rDwmM2Xfp1t24tMGV9jt5RaXf8ViifsyHW43eFqM-ZCXwThGuxSwxrvP4k5O32DG6iiF0sc4=s100-no?authuser=0";
    //    }
// if (iconChange === cloudy) {
  //      iconElement.innerHTML = "https://lh3.googleusercontent.com/GDHgsbdpEzOGXKsGk74KPuDgEo_9hbaO4BXh_NEtJRmsECfJvLVZGt-fZcJPpB8DEJbdR0sW3oa1zkKyVQdJlkOY005lzHQRGZPql9fYdZmrtTVNK0226MsuWtmvzqnhUrJ2mM0ZHx0KCu9fEnVOiS_7icNoSUJrQqAdIduLpALte9iIb_3PbTWgxY0fmx5UgGPYmWxlDxnp0JGIuvzJ-65I5GP23is7ILQ_W_6HerbDUT4YIsGFxKsQwcc5-fEdzmSfFYj-3AHy6CDV3j6Bjv7NySuBuZkl233bVPIvV7b79vhSowrX-aZEUBmgfkHiIcPfez7ek_6qDBTP1D4TA4ET_9m_ycnl-oXSFBpvc7qxYb1Dl0575lcsdfFwWJLP10ae46-DoNXHHpqNEJ0euZEfF5Cy5bNTpevA4gqmECjsfpTcDzq9lvTz1zMWRenMDoRbFjgcRgjSTf7uSp4joKrc64wpoVqpM3O6T7jYmIS9V0IAjY_z5yNYNdnmNt5HPa4-bTg9dkJtY70drTYofomnWrRch9c0YM9uIj44xnTq6vE2Ad05JuwsH9W3S-FQyAtm1G9MdeHpyyZZebg-jbNGzWC_e2qgVkm4z2NMXt10nju8tQhzo0QaVca_SjbDe_HlZ8HNcpSjicbYVOOGKgsGac3VarDGFjQ4TvPVvpQKqM5HzGONth1RSK6c8y4RYBBvflEhc6MaIesnFsUb8mx-JGe9SWSjL_VFNM9Z3MY1OP-FGoIrDrpW-W0WPKo=s100-no?authuser=0";
  //      }
// if (iconChange === snow || snowy) {
   //     iconElement.innerHTML = "https://lh3.googleusercontent.com/DCdtS1_pe90F4Qa1lZlL_wN6npk5F5KSovgh5ms5JlSoJc39-mQQU28sczF_JF-u18_sJTzEeUM5eXuC3BlKWpKi7iljY4xi6j4Tq2a-m-jU-qeIzyNasWZ4W-SLe6V4AYkYntQJQnRSFgbFFdqpcBrmCToW-BJqDFArv2j3W2_BxGaGaD4m0UcJ6DpZYSyD2-nyL_wYPeXApvYQVmy2nBbEl5gdC0nphXKq7eefJniFpehzND_ZwVVOgkVOPoXY30zC5cK82PHf_p_Niw__NwETNbolBHMfSyU2Zp5h12SjeYWUiJQ4Y16EGktHhRH8V-ff7t4J2YK1-rgHfMuCRJNHm2b3IPIr1I_40X7OLyiLy8Wr5eqIcDKFueurn7kVST5-k0O7SFIFcK03kpOzz_cssvqB20CXcpvrfOFmvn2J9gR39pSlAaSHPNCR9_2jgLAhKJcKPDx-2iKRU-l-1XnK2x_cw0NwFvcj3WOZqNk73FYQy0ImP1gD7sk7-Nk2zpixNH79ROtbtqvNM__-qrfOd3BwzyNvvYzH7EHHWgujxXSasxP-V47NeDicpQxB7t1R9KW4S4tV0Pzg3hNgEYItCbfwvmWadyYRpfJSTcfYxUHDo4lCze8YgbWNzYpHa7iTwMeUgm2Zykqlu6I9cNL_aI3DYCBgTSOcyMb2NadYhRt8GQvUlqJaqFh4ntqQVchnYjS7za85KnBCDjPQB9MvlRlwTVaWFn7xjl3RPd0AeUlin0wW5em3SimCnzc=s100-no?authuser=0";
   //     }
// if (iconChange === sunny || hot || sun) {
  //      iconElement.innerHTML = "https://lh3.googleusercontent.com/W0ZoXZANFzQRTnUQIH7mxc4LAQZq_1rI_BEajyCCKlzYoE0yUYW_KLuC8n6SyWfijlz4wEOO1FQrP8QNo3YGGSOIPTi2SkuxhWXAV5iGxBglBN12yq1M1MtN53RklWyjQwpk8TlLTjSGRY1Ewa2Fa6stdf6y5vcLdl3ATeC4seNvjAp4S-y5NsvBB8-wWhlTAn8lsRQnHNpE1yPQLpxfg3djNud83-BQsiHUp6-TrEsvSSHtPJdIJb-RQRzDm8xSbc0mpkmPiE3gdn_q76KFd0UlUcboG0SYt17j-jv9L_Ina84o5UYf5i0Yi5G4dpwIzAEDGOI5CSBo9FS-ZO4ERuYbDju2b9iKDNuChBh2VFLQ94YlXnYElD4-FNH64WIUKrJaYhUhzGEDxv1yzBgQyaY0XQ7Kbfx8IkiqIId2rbukYggltYKAxB6ZABuo7e2bl2I6ZaRbSyTyIAhvRYAyynTb0qXVvUuWf0ApMXl6EE-AeuyACv4vUb7U70mrAOJaKvtoKpP3c_1bU1rsARp0zbfPBU6G8mVhvmB6bM0_tSg3loRv_Zk3kNrdncyjDSNKq0uYUNTtgrPKEZN_sNFLPHvTaJlSAVtB7I1NpGCaThR36Mdff8cNrLD-YtQLNNyjQSdaHrzL8dJLp1HZzMZWBLw0zD7BPYIOFm5upFSf4uKnq3JouZCRyoW5G9WOjhRua0PIcvLbarBwrSkZo6RdE9A7MMzMNa3uXWnws3fUKFSzkKB3aWXCwccuxFmxxbA=s100-no?authuser=0";
  //      }
// if (iconChange === stormy || thunderstorms) {
//        iconElement.innerHTML = "https://lh3.googleusercontent.com/GqKCLU4eV9t75MZj70ktPvLgPg9XOwXYJgBydNnb-0-HWFHYqcynApRHBEh4VjFqQzgRt5ta3TA_tZd7nAUDg5CgMfJDKu-FEm3K4pvBmZWYhaXV4V6uuG6o1I7PDzAXIre6FHJMf982GvOabmjZHtZ_rrEy2O7g5RLmLjvXrbddq5vrWTLrKWLziXCek-zaQgoB2FwN3Jbi8twyjsETPxIsitcLYn5pD0057YzDiaTzHJZOhVeMKQQ4Bu7EachnXas3HmSfL5r1jy4osG3KA0Wxhzh10klKTxR4o00RJuQVsrpi5tD_beB83OIt7Z6Dv7wNs_2ruORF6YR6AVTeXFo4rv-2g_2C8VmegrRtrlpIC1Bkcu-xZS7MlNADX2z9iQpwK1MujxsxsTgFijAl4o8nlB5UWrSyHs7CKBO-u0Ex-KWYM0DjUnQWUExNTGAWZsorIyj1VtM6wla7jMdtjH7C-MKYnG9HsFDTZuYVg8xuA8fwlnqG17y2UaQ9q7j4v98bOYJogILHlv3q7MRJOhpekl8DnDKLVkBSSxY2CNLfzpOaPelrAmInbXQztQ1V69t4xzSyPmgUClHRb2xJqLdMijTwCVU2nBswwERpBoPG-aXfch7Bu4CW5zo4kd-dEOhJhkoa5eWvSPXUddGI5XD6cJwHBO-CBo5MEzaG6MYADk2pBkLwUod1nCm8li-6SmlTpW1gIluxVv40NPdEcJfdc8hXfEcbsQxF19TojfN8mmP5IJj3jSOWo1koysg=s100-no?authuser=0";
 //       }
// else {
 //           iconElement.innerHTML = "https://lh3.googleusercontent.com/8ycKP3UbaF9AqE5W-fjhV0_B44Rujt9uwKyDSjF2qE6Y2CPeFloazsQhhMeR__A0wFp73lsjDTCCiZEJyVhe5l_XMYXOfbatwxHht3S_E5IdyxYO0w9Bne37pPlI7qIQw3kVahzrt3YTlDzNIdRcmSRXeLKEANA0dUMQN-xfmczAj786kGR_d3S-TKhXPhRLOMUAOwOL27II5dqkzfFoiwWcUDAMB7cqzduBGjrxTJQoZxFY_em8FdjA41qBQqwXueXRvAVQcWu_qNJlDoaqSODnVGQg-reEAiT_4lMaHq5Jm6LPSKPPkkFhxQAUnNNCtXLPB74Fk2a149KAtUo_KqGDctSsGPAVoPHQM3zFn3UjQvlGuGbutALsfHE3Rp97TpMDGivqc1gz5tpecL699FxYfA0JWKJKkUtP9id0Mt1vCUW2ZVPlIwgDNoe2BxM1PtGOjW5SSW87ekRK_IrXPQN9K2WP0hjTJntBBBOyZUDVi5IBw8hjbKknqNmWoqXjEmw7EpjdOjlK0zzJXaZER9ujtEbVye-6fbOKW8hmmw5H5BNUZrWdks9Lp4r58XRjgHyCNGzfCXG87LeUt5_yc89fxx7VzRbccCoKM8cItLY0cdcRUkFuAIPGKElA1puAm9xokGfIShxgNKNg2_njG1M0_586f6vgS1TtPh0ft8jBjPcvGQ8GPegQfjqrirRv-vdCkEEzpbDBBcC5QZx1SA2-YXde6jih0m5Jpyb-yKFzCVlm1xJwAsbh6EVeP_E=s100-no?authuser=0";
 //       }
// }


