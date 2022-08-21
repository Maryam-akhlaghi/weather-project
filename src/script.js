function searchCity(event) {
  event.preventDefault();
  let city = document.querySelectorAll("#current-city");
  let searchValue = document.querySelector("#searching");
  for (i = 0; i < city.length; i++) {
    city[i].innerHTML = searchValue.value;
  }
  getApi(searchValue.value);
}

function getApi(cityName) {
  let apiKey = "b5a5a0f8c5c394e805798a731488bd78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let cityName = response.data.name;
  let currentCity = document.querySelectorAll("#current-city");
  for (let i = 0; i < currentCity.length; i++) {
    currentCity[i].innerHTML = cityName;
  }
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = ` ${temp}`;
  let country = document.querySelector("#current-country");
  country.innerHTML = response.data.sys.country;
  let minmumTemp = document.querySelector("#min-temp");
  minmumTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maximumTemp = document.querySelector("#max-temp");
  maximumTemp.innerHTML = Math.round(response.data.main.temp_max);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let descript = document.querySelector("#description");
  descript.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  getForecastApi(lat, lon);
  centigrade = response.data.main.temp;
  document.querySelector("#centigrade").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
}
function getForecastApi(lat, lon) {
  let apiKey = "b5a5a0f8c5c394e805798a731488bd78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentTemp);
}
function getCurrentTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b5a5a0f8c5c394e805798a731488bd78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function time() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let second = now.getSeconds();
  if (second < 10) {
    second = `0${second}`;
  }
  let time = document.querySelector("h4");
  time.innerHTML = `${day}  ${hour}:${minute}:${second}`;
}
time();
setInterval(time, 1000);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = centigrade * 1.8 + 32;
  document.querySelector("#temp").innerHTML = ` ${Math.round(fahrenheit)}`;
  document.querySelector("#centigrade").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}
function convertToCentigrade(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = ` ${Math.round(centigrade)}`;
  document.querySelector("#fahrenheit").classList.remove("active");
  document.querySelector("#centigrade").classList.add("active");
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}
function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastElement = response.data.daily;
  let forecastHTML = `<div class="card-group">`;
  for (i = 1; i < 7; i++) {
    let day = formatDay(forecastElement[i].dt);
    forecastHTML =
      forecastHTML +
      ` <div class="card">
    <div class="card-body">
    <h5 class="card-title">${day}</h5>
    <p class="card-text">${Math.round(
      forecastElement[i].temp.min
    )}° C - ${Math.round(forecastElement[i].temp.max)}° C</p>
    <div class="icon" ><img src="http://openweathermap.org/img/wn/${
      forecastElement[i].weather[0].icon
    }@2x.png" , alt="${
        forecastElement[i].weather[0].description
      }"/> </div> <div class="forecast-desc">${
        forecastElement[i].weather[0].description
      }</div>
    </div>
    </div>`;
  }
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  let uvIndex = document.querySelector("#uv-index");
  uvIndex.innerHTML = `UV Index : ${response.data.current.uvi}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector(".current");
button.addEventListener("click", findPosition);

let centigrade = null;
getApi("yazd");

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let centigradeLink = document.querySelector("#centigrade");
centigradeLink.addEventListener("click", convertToCentigrade);
