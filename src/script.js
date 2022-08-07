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
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = ` ${temp}`;
  let country = document.querySelector("#current-country");
  country.innerHTML = response.data.sys.country;
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let descript = document.querySelector("#description");
  descript.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
}
function showCity(response) {
  let cityName = response.data.name;
  let currentCity = document.querySelectorAll("#current-city");
  for (let i = 0; i < currentCity.length; i++) {
    currentCity[i].innerHTML = cityName;
  }
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
  axios.get(apiUrl).then(showCity);
}

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
let minute = now.getMinutes();
let time = document.querySelector("h4");
time.innerHTML = `${day}  ${hour}:${minute}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector(".current");
button.addEventListener("click", findPosition);
