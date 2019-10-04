let city = [
  "Pirot",
  "Niš",
  "Užice",
  "Kragujevac",
  "Zaječar",
  "Požarevac",
  "Beograd",
  "Novi Sad",
  "Subotica"
];

// function for daily temperatures
function convertUnix(unixTime) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let date = new Date(unixTime * 1000);
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();
  let dayOfWeek = days[date.getDay()];

  let currentDate = dayOfWeek + " " + day + "." + month + " " + year + ".";
  return currentDate;
}

// long term forecast weather
class TemperatureFirstDay {
  async getTemperature(lat, long, arr) {
    try {
      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fb4c116f915c61742654d62a921fffa2/${lat},${long}`;

      let result = await fetch(api);
      let data = await result.json();

      // temperature for tomorow
      const { temperatureMin, temperatureMax, time, icon } = data.daily.data[1];
      let tempMin = (((temperatureMin - 32) * 5) / 9).toFixed(0);
      let tempMax = (((temperatureMax - 32) * 5) / 9).toFixed(0);

      // temperature for day after tomorow
      const temperatureMin2 = data.daily.data[2].temperatureMin;
      const temperatureMax2 = data.daily.data[2].temperatureMax;
      let tempMin2 = (((temperatureMin2 - 32) * 5) / 9).toFixed(0);
      let tempMax2 = (((temperatureMax2 - 32) * 5) / 9).toFixed(0);
      // temperature for day after day after tomorow
      const temperatureMin3 = data.daily.data[3].temperatureMin;
      const temperatureMax3 = data.daily.data[3].temperatureMax;
      let tempMin3 = (((temperatureMin3 - 32) * 5) / 9).toFixed(0);
      let tempMax3 = (((temperatureMax3 - 32) * 5) / 9).toFixed(0);

      // days
      document.querySelector(".dayFirst").textContent = convertUnix(time);

      const time2 = data.daily.data[2].time;
      document.querySelector(".daySecond").textContent = convertUnix(time2);

      const time3 = data.daily.data[3].time;
      document.querySelector(".dayThird").textContent = convertUnix(time3);

      // set icons
      let icon2 = data.daily.data[2].icon;
      let icon3 = data.daily.data[3].icon;

      // long term forecast
      let resultLong = `
          <div class="long-city">
             
            <h4 class="city-name">${city[arr]}</h4>
            <div class="longForecast">
              <hr>
              <div class="firstDay">
                <img id="temp-icon" src="temperature icons/${icon}.svg" alt="no picture" />
                <div class="forecastFirst">
                  <h5 class="maxTemp">
                   <span id="max"> ${tempMax} C</span>
                   <span id="text">max</span>
                  </h5>
                  <h5 class="minTemp">
                   <span id="min"> ${tempMin} C</span>
                   <span id="minText">min</span>
                  </h5>
                </div>
              </div>
              <hr>

              <div class="secondDay">
                <img id="temp-icon" src="temperature icons/${icon2}.svg" alt="no picture" />
                <div class="forecastFirst">
                  <h5 class="maxTemp">
                   <span id="max"> ${tempMax2} C</span>
                   <span id="text">max</span>
                  </h5>
                  <h5 class="minTemp">
                   <span id="min"> ${tempMin2} C</span>
                   <span id="minText">min</span>
                  </h5>
                </div>            
              </div>
              <hr>

              <div class="thirdDay">
                <img id="temp-icon" src="temperature icons/${icon3}.svg" alt="no picture" />
                <div class="forecastFirst">
                  <h5 class="maxTemp">
                   <span id="max"> ${tempMax3} C</span>
                   <span id="text">max</span>
                  </h5>
                  <h5 class="minTemp">
                   <span id="min"> ${tempMin3} C</span>
                   <span id="minText">min</span>
                  </h5>
                </div>            
              </div>
              <hr>
            </div>    
          </div>
        `;
      document.querySelector(".long-temperature").innerHTML += resultLong;
    } catch (error) {
      console.log(error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const temperature1 = new TemperatureFirstDay();

  temperature1.getTemperature(43.15306, 22.58611, 0);
  temperature1.getTemperature(43.32472, 21.90333, 1);
  temperature1.getTemperature(43.85861, 19.84878, 2);
  temperature1.getTemperature(44.01667, 20.91667, 3);
  temperature1.getTemperature(43.90358, 22.26405, 4);
  temperature1.getTemperature(44.62133, 21.18782, 5);
  temperature1.getTemperature(44.80401, 20.46513, 6);
  temperature1.getTemperature(45.25167, 19.83694, 7);
  temperature1.getTemperature(46.1, 19.66667, 8);
});
