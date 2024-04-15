function getTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  let newCondition = response.data.condition.description;
  //let newIcon = response.data.condition.icon_url;
  //console.log(newIcon);
  let newHumidity = response.data.temperature.humidity;
  let newWind = response.data.wind.speed;

  let tempValue = document.querySelector("#current-temperature-value");
  tempValue.innerHTML = (temperature * 9) / 5 + 32;

  //COME BACK TO ICON
  //let currentIcon = document.querySelector("#current-temperature-icon");
  //currentIcon.innerHTML = "<img src='${newIcon}";

  let Condition = document.querySelector("#condition");
  Condition.innerHTML = newCondition;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${newHumidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${newWind} km/h`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let city = searchInputElement.value;
  cityElement.innerHTML = city;

  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();

  currentDateELement.innerHTML = formatDate(currentDate);

  let apiKey = "e0e116f3440f7e76eb34tfo465e544a7";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //console.log(apiURL);
  axios.get(apiURL).then(getTemp);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  let fullDate = `${formattedDay} ${hours}:${minutes}`;
  return fullDate;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

search("Lakeland");