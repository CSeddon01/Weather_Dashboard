
// Saving the current date
let today = new Date().toLocaleDateString();
console.log(today);

// API key from openweathermap.org
let weather = {
  "apiKey": "c369f155016b5438a2e3977424bf7b67",
  fetchWeather: function(city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
 
  // Retrieve items from weather service and attaches them to the proper class
  displayWeather: function(data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const  lat  = data.coord.lat;
    const  lon  = data.coord.lon;
    const { uvIndex } = data.current.uvi;
    console.log(name, icon, temp, humidity, speed, lat, lon, uvIndex);
    var latLonPair = lat.toString() + " " + lon.toString();
    localStorage.setItem(name, latLonPair);
    document.querySelector(".currentDay").innerText = " " + today + " ";
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind: " + speed + " MPH";
    document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
    document.querySelector("UV Index:" + uvIndex);
  },
  // Links the function to the search button
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  latLon: function(position) {
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?"
    lat=${latitude}&lon=${longitude}&units=metric&appid=c369f155016b5438a2e3977424bf7b67`;
    fetchData();
  },
  // displayUVI: function() {
  // const  uvIndex  = data.current.uvi;
  //   document.querySelector(".UV").innerText = "UV Index:" + uvIndex;
  //   console.log("hi" + displayUVI);
  // },
  
}

// Event listener for the search button click
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Added an enter button click event listener
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// weather.fetchWeather();