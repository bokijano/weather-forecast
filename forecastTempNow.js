// function when we load the page to see current temperature
function load(lat, long, city, icons) {
  const proxy = "http://cors-anywhere.herokuapp.com/";
  const api = `${proxy}https://api.darksky.net/forecast/fb4c116f915c61742654d62a921fffa2/${lat},${long}`;

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const { temperature, icon, time } = data.currently;

      //set temperatures
      temperatureC = (((temperature - 32) * 5) / 9).toFixed(0);

      document.getElementById(city).textContent = temperatureC;

      // set icon
      let iconTemp = document.getElementById(icons);

      iconTemperature(icon, iconTemp);
      // set current date
      document.querySelector(".currDate").textContent = convertUnix(time);
    });
}

// function for seing icons for current temperature
function iconTemperature(icon, iconTemp) {
  switch (icon) {
    case "clear-day":
      iconTemp.src = "temperature icons/clear-day.svg";
      break;
    case "clear-night":
      iconTemp.src = "temperature icons/clear-night.svg";
      break;
    case "partly-cloudy-day":
      iconTemp.src = "temperature icons/partly-cloudy-day.svg";
      break;
    case "partly-cloudy-night":
      iconTemp.src = "temperature icons/partly-cloudy-night.svg";
      break;
    case "cloudy":
      iconTemp.src = "temperature icons/cloudy.svg";
      break;
    case "rain":
      iconTemp.src = "temperature icons/rain.svg";
      break;
    case "sleet":
      iconTemp.src = "temperature icons/sleet.svg";
      break;
    case "snow":
      iconTemp.src = "temperature icons/snow.jpg";
      break;
    case "wind":
      iconTemp.src = "temperature icons/wind.jpg";
      break;
    case "fog":
      iconTemp.src = "temperature icons/fog.svg";
      break;
  }
}

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
    "Oktober",
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

  let currentDate = dayOfWeek + " " + day + ". " + month + " " + year + ".";
  return currentDate;
}

window.onload = load(43.15306, 22.58611, "temPirot", "iconPirot");
window.onload = load(43.32472, 21.90333, "temNis", "iconNis");
window.onload = load(43.85861, 19.84878, "temUzice", "iconUzice");
window.onload = load(44.01667, 20.91667, "temKragujevac", "iconKragujevac");
window.onload = load(43.90358, 22.26405, "temZajecar", "iconZajecar");
window.onload = load(44.62133, 21.18782, "temPozarevac", "iconPozarevac");
window.onload = load(44.80401, 20.46513, "temBeograd", "iconBeograd");
window.onload = load(45.25167, 19.83694, "temNoviSad", "iconNoviSad");
window.onload = load(46.1, 19.66667, "temSubotica", "iconSubotica");
