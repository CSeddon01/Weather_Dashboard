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

  displayWeather: function(data) {

    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, temp, humidity, speed);
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src ="http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind: " + speed + " MPH";
    document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
}

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  console.log("hi");
 
});

// document
//   .querySelector(".search-bar")
//   .addEventListener("keyup", function (event) {
//     if (event.key == "Enter") {
//       weather.search();
//     }
//   });

// weather.fetchWeather();