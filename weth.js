const temperature = document.getElementById("temperature");
const icon = document.getElementById("icon");
const weatherCondition = document.getElementById("weatherCondition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const country = document.getElementById("country");
const visibility = document.getElementById("visibility");
const clouds = document.getElementById("clouds");
const time = document.getElementById("time");

const cityName = document.querySelector(".location");
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('search-btn');
const additionalDetailsBtn = document.getElementById('moreDetails');
const moreLessText = document.querySelector('.more-less');

async function checkWeather(city) {
  const apiKey = "4aeb1e265437d3c29803abcb71f12b67";
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (!city.trim()) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(api_url);

    if (response.status === 404) {
      alert("City not found!");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      showDetails(data);
      additionalDetails(data);
      showDate();
      searchBar.value = "";
      console.log(data);
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    console.log("There was a problem while fetching the data", error);
  }
}

function showDetails(data) {
  const showIcon = data.weather[0].icon;
  cityName.textContent = `${data.name}`;
  temperature.textContent = `${Math.floor(data.main.temp)}° C`;
  icon.src = `https://openweathermap.org/img/wn/${showIcon}.png`;
  weatherCondition.textContent = `${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${(data.wind.speed * 3.6).toFixed(1)} km/h`; // Converted from m/s to km/h
  feelsLike.textContent = `Feels Like: ${data.main.feels_like}° C`;
}

function additionalDetails(data) {
  pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
  maxTemp.textContent = `Max Temp: ${data.main.temp_max}° C`;
  minTemp.textContent = `Min Temp: ${data.main.temp_min}° C`;
  country.textContent = `Country: ${data.sys.country}`;
  visibility.textContent = `Visibility: ${data.visibility} m`;
  clouds.textContent = `Clouds: ${data.clouds.all}`;
}

// Show date
function showDate() {
  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  time.textContent = `${day}-${month}-${year}`;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBar.value);
});

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBar.value);
  }
});

additionalDetailsBtn.addEventListener("click", () => {
  document.querySelector('.icon').classList.toggle('active');
  document.querySelector('.second-container').classList.toggle('active');
  moreLessText.textContent = moreLessText.textContent === "See less details" ? "See more details" : "See less details";
});

// Initial load
showDate();
checkWeather("jimma"); // default city on page load
