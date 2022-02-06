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
    // var latLonPair = lat.toString() + " " + lon.toString();
    // localStorage.setItem(name, latLonPair);
    var searchHistory = localStorage.getItem("searchHistory");
    if(!searchHistory) {
      searchHistory = name
    } else {
      searchHistory = searchHistory + "," + name;
    }
    var historyArray = searchHistory.split(",");
    var citiesEl = document.getElementById("savedCities");
    citiesEl.innerHTML = "";
    for(var i = 0; i < historyArray.length; i++) {
      const city = historyArray[i];
      var firstCity = document.createElement("button");
      firstCity.value = city;
      firstCity.textContent = city;
      firstCity.className = "btn btn-tertiary";
      var clickHandler = () => {
        console.log("called event", city);
        weather.search(city); 
      }
      firstCity.addEventListener("click", clickHandler);
      citiesEl.appendChild(firstCity);
    }
   
    localStorage.setItem("searchHistory", searchHistory);
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
  search: function (city) {
    this.fetchWeather(city);
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
      document.querySelector(".UV").innerText =
        "UV index: " + uvi + " Not Good";
    }
    var table1 = document.getElementById("forecastTable");
    table1.innerHTML = "";
    for (var i = 1; i <= 5; i++) {
      const { dt } = input.daily[i];
      const temp = input.daily[i].temp.max;
      const { icon } = input.daily[i].weather[0];
      const { wind_speed } = input.daily[i];
      const { humidity } = input.daily[i];
      var dayname = new Date(dt * 1000).toLocaleDateString();
      var iconImage = "https://openweathermap.org/img/wn/" + icon + ".png";

      console.log(dt, temp, wind_speed, humidity, iconImage);
     
      var rowrow = document.createElement("tr");
        var cell1 = document.createElement("td");
        var text1 = document.createTextNode(dayname);

        var cell2 = document.createElement("td");
        var text2 = document.createTextNode(temp + "°F");

        var cell3 = document.createElement("td");
        var img = document.createElement("img");
        img.src= iconImage;
      

        var cell4 = document.createElement("td");
        var text4 = document.createTextNode(wind_speed + " MPH");

        var cell5 = document.createElement("td");
        var text5 = document.createTextNode(humidity + "%");

        cell1.appendChild(text1);
        rowrow.appendChild(cell1);

        cell2.appendChild(text2);
        rowrow.appendChild(cell2);

        cell3.appendChild(img);
        rowrow.appendChild(cell3);

        cell4.appendChild(text4);
        rowrow.appendChild(cell4);

        cell5.appendChild(text5);
        rowrow.appendChild(cell5);
      
      table1.appendChild(rowrow);
    }
  },
};

// Event listener for the search button click
document.querySelector(".search button").addEventListener("click", function () {
  var city = document.querySelector(".search-bar").value
  weather.search(city);
});

// Added an enter button click event listener
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
