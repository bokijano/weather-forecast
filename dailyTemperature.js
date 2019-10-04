let cities = [
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

// daily and lonterm forecast weather
class Temperature {
  async getTemperature(lat, long, arr) {
    try {
      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fb4c116f915c61742654d62a921fffa2/${lat},${long}`;

      let result = await fetch(api);
      let data = await result.json();

      const { temperatureMin, temperatureMax, icon } = data.daily.data[0];

      let tempMin = (((temperatureMin - 32) * 5) / 9).toFixed(0);
      let tempMax = (((temperatureMax - 32) * 5) / 9).toFixed(0);

      // daily forecastFirst

      let results = `
        <div class="curr-city">
         <h2 class="city-name">${cities[arr]}
           <span onclick="getPosition(${lat}, ${long}, ${arr})" class="fa fa-angle-double-right"></span>
         </h2>
         <img id="temp-icon" src="temperature icons/${icon}.svg" alt="no picture" />
         <h5 class="maxTemp"><span id="max">${tempMax} C</span><span id="text">MAX</span></h5>
         <h5 class="minTemp"><span id="min">${tempMin} C</span><span id="text">MIN</span></h5>
         
        </div> 
      `;
      document.querySelector(".current-temperatures").innerHTML += results;
    } catch (error) {
      console.log(error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const temperature = new Temperature();

  temperature.getTemperature(43.15306, 22.58611, 0);
  temperature.getTemperature(43.32472, 21.90333, 1);
  temperature.getTemperature(43.85861, 19.84878, 2);
  temperature.getTemperature(44.01667, 20.91667, 3);
  temperature.getTemperature(43.90358, 22.26405, 4);
  temperature.getTemperature(44.62133, 21.18782, 5);
  temperature.getTemperature(44.80401, 20.46513, 6);
  temperature.getTemperature(45.25167, 19.83694, 7);
  temperature.getTemperature(46.1, 19.66667, 8);
});
