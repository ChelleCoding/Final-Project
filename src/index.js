function updateTEMP(response) {
  
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();

  currentDateELement.innerHTML = formatDate(currentDate);
  
  let temperature = Math.round(response.data.temperature.current);
  let newCondition = response.data.condition.description;

  let newIcon = document.querySelector("#current-temperature-icon");
  newIcon.innerHTML=`<img src="${response.data.condition.icon_url}"  class="current-temperature">`;
  
    let newHumidity = response.data.temperature.humidity;
  let newWind = response.data.wind.speed;

  let tempValue = document.querySelector("#current-temperature-value");
  let convertedTemp = (temperature * 9) / 5 + 32
  tempValue.innerHTML = `${convertedTemp} °F`;

  let Condition = document.querySelector("#condition");
  Condition.innerHTML = newCondition;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${newHumidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${newWind} km/h`;

getForecast(response.data.city);
}


function pullAPI(event){
  event.preventDefault();
  //console.log(event);
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;  
  let apiKey = "e0e116f3440f7e76eb34tfo465e544a7";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(updateTEMP);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
    console.log(minutes);
  }

  if (hours < 10) {
    hours = `0${hours}`;
    console.log(hours);
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

function getForecast(city) {
   let apiKey = "e0e116f3440f7e76eb34tfo465e544a7";
let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayForecast);
}


function displayForecast(response) {
console.log(response);

  let forecastElement = document.querySelector("#forecast");

  let days = ['Mon','Tue','Wed','Thu','Fri'];
  let forecastHtml = "";


  
  days.forEach(function(day) {
    forecastHtml = 
    forecastHtml + `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">⛅</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>15</strong>
      </div>
      <div class="weather-forecast-temperature">9 </div>
    </div>
    </div>
    `;
  });

  forecastElement.innerHTML=forecastHtml;
}

let getCity = document.querySelector("#search-form");
getCity.addEventListener("submit", pullAPI);

//getForecast("Paris");

//displayForecast();