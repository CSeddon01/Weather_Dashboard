// Saving the current date
let today = new Date().toLocaleDateString();
// console.log(today);

// API key from openweathermap.org
let weather = {
  apiKey: "c369f155016b5438a2e3977424bf7b67",
  fetchWeather: function (city) {
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
  displayWeather: function (data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    console.log("datalat" + lat);
    console.log("datalon" + lon);
    console.log(data);
    var latLonPair = lat.toString() + " " + lon.toString();
    localStorage.setItem(name, latLonPair);
    document.querySelector(".currentDay").innerText = " " + today + " ";
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind: " + speed + " MPH";
    document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
    weather.latLon(lat, lon);
  },
  // Links the function to the search button
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  // Fetch UV Index API
  latLon: function (lat, lon) {
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=c369f155016b5438a2e3977424bf7b67`;
    fetch(api)
      .then((response) => response.json())
      .then((input) => this.displayUVI(input));
  },

  // Displays UVI and color codes
  displayUVI: function (input) {
    
    const { uvi } = input.current;
    document.querySelector(".UV").innerText = "UV Index: " + uvi;
    if (uvi <= 2) {
      document.getElementById("UV").style.color = "green";
      document.querySelector(".UV").innerText = "UV index: " + uvi + " Good";
    } else if (uvi > 2 && uvi <= 5) {
      document.getElementById("UV").style.color = "orange";
      document.querySelector(".UV").innerText = "UV index: " + uvi + " Okay";
    } else if (uvi > 5 && uvi <= 7) {
      document.getElementById("UV").style.color = "red";
      document.querySelector(".UV").innerText = "UV index: " + uvi + " Not Good";
    }

    for (var i = 1; i <=6 ; i++) {
      const { dt } = input.daily[i];
      const temp = input.daily[i].temp.max;
      const { icon } = input.daily[i].weather[0];
      const { wind_speed } = input.daily[i];
      const { humidity } = input.daily[i];
      var dayname = new Date(dt * 1000).toLocaleDateString();
      var iconImage = "https://openweathermap.org/img/wn/" + icon + ".png";
      // var forecast = $(".forecast");
      // forecast.innerText = dayname;
      // forecast.innerText = innerText = "Temp: " + temp + "°F";
      // forecast.innerText = iconImage;
      // forecast.innerText = innerText = "Wind: " + wind_speed + " MPH";
      // forecast.innerText = innerText = "Humidity: " + humidity + "%";
      // container.append(forecast);
      console.log(dt, temp, wind_speed, humidity, iconImage);
    
      var div= document.createElement("td");
      div.innerHTML = dayname;
      div.innerHTML = "Temp: " + temp + "°F";
      div.innerHTML = iconImage;
      div.innerHTML = "Wind: " + wind_speed + " MPH";
      div.innerHTML = "Humidity: " + humidity + "%";
      document.getElementById("forecast").appendChild(div);
    
    }
    console.log("Daily", input);
  },
};

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
