let temperatureDegree = document.querySelector(".temperature-long");
let iconID = document.querySelector(".icon");

function getPosition(lat, long, arr) {
  document.querySelector(".long-temperature").style.display = "none";
  document.querySelector(".current-temperatures").style.display = "none";
  document.querySelector(".map-content").style.display = "none";

  document.querySelector(".detail-forecast").style.display = "flex";

  const proxy = "http://cors-anywhere.herokuapp.com/";
  const api = `${proxy}https://api.darksky.net/forecast/fb4c116f915c61742654d62a921fffa2/${lat},${long}`;

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const { temperature, summary, icon } = data.currently;
      const { temperatureMin, temperatureMax } = data.daily.data[0];
      // daily and currently temperature
      temperatureC = (((temperature - 32) * 5) / 9).toFixed(0);
      tempMin = (((temperatureMin - 32) * 5) / 9).toFixed(0);
      tempMax = (((temperatureMax - 32) * 5) / 9).toFixed(0);

      // hourly temperature
      document.querySelector(".date-currently").innerHTML = `${city[arr]},
        ${convertUnix(data.daily.data[0].time)}`;
      let result = `
        <div class="summ"> 
        <img id="iconCurr" src="temperature icons/${icon}.svg" />
        <h4 id="summ-text">${summary}</h4> 
       </div> 
        <h5 class="currentlyTemp">${temperatureC} C</h5>
        <h5 class="maxTemp"><span id="max">${tempMax} C</span><span id="text">MAX</span></h5>
        <h5 class="minTemp"><span id="min">${tempMin} C</span><span id="text">MIN</span></h5>
       
     `;
      document.querySelector(".daily").innerHTML = result;

      // temperature for the next 5 hours
      let hourlyTemp = [
        data.hourly.data[0],
        data.hourly.data[1],
        data.hourly.data[2],
        data.hourly.data[3],
        data.hourly.data[4]
      ];

      let resultHourly = "";

      hourlyTemp.forEach(hour => {
        resultHourly += `
      
        <div class="first-hour">
           <h5 class="hour-time">${convertUnixHour(hour.time)} h</h5>
           <img id="hourly-icon" src="temperature icons/${
             hour.icon
           }.svg" alt="no picture" />
           <h5 class="temp-celsius">${toCelsius(
             hour.temperature
           )} C</h5>             
        </div> `;
      });

      document.querySelector(".hourly-temp").innerHTML = resultHourly;

      // set forecast for the next 5 days
      let longTerm = [
        data.daily.data[1],
        data.daily.data[2],
        data.daily.data[3],
        data.daily.data[4],
        data.daily.data[5]
      ];

      let resultLong = "";
      longTerm.forEach(long => {
        resultLong += `
          <div class="day-temp">
            <h5>${convertUnix(long.time)}</h5>
            <div class="long-temp">
            <img id="long-icon" src="temperature icons/${
              long.icon
            }.svg" alt="no picture" />
            <p class="long-max">
             <span style="color: red">${toCelsius(long.temperatureMax)} C</span>
             <span>max</span>
            </p>
            <p class="long-min">
             
             <span style="color: green">${toCelsius(
               long.temperatureMin
             )} C</span>
             <span>min</span>
            </p>
            <h6 style="margin-top: 10px;">${long.summary}</h6>
            </div>
          </div>
          <hr> 
        `;
      });
      document.querySelector(".detail-long-term").innerHTML = resultLong;
    });
}

// function for convert time
function convertUnixHour(unixTime) {
  let date = new Date(unixTime * 1000);
  let hour = date.getHours();

  if (
    hour == "0" ||
    hour == "1" ||
    hour == "2" ||
    hour == "3" ||
    hour == "4" ||
    hour == "5" ||
    hour == "6" ||
    hour == "7" ||
    hour == "8" ||
    hour == "9"
  ) {
    hour = "0" + hour;
  }

  let currentHour = hour;

  return currentHour;
}

// function to convert fahrenhait to celsius
function toCelsius(temp) {
  let temperature = (((temp - 32) * 5) / 9).toFixed(0);

  return temperature;
}

// function to back to main menu
function backToMainMenu() {
  document.querySelector(".long-temperature").style.display = "block";
  document.querySelector(".current-temperatures").style.display = "flex";
  document.querySelector(".map-content").style.display = "block";

  document.querySelector(".detail-forecast").style.display = "none";
}
