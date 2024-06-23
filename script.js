const apis = new Map([
    ["current-weather", "https://api.openweathermap.org/data/2.5/weather?units=metric"],
    ["get-lat-lon-city", "http://api.openweathermap.org/geo/1.0/direct?limit=1"]
]);

let apiKey = "f9cd3b24e118701f604622b918a81efd";
let weatherData;

function showLoading() {
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = '<div class="spinner"><p class="spinner-text">Fetching Data...</p></div>';
    document.body.appendChild(loading);
  }
  
  // Function to hide loading animation
  function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
      loading.remove();
    }
  }

async function getCityInfo(city) {
    try {
        const response = await fetch(apis.get("get-lat-lon-city") + `&q=${city}&appid=${apiKey}`);
        const cityInfo = await response.json();
        return cityInfo;
    } catch (error) {
        return;
    }
}

async function checkWeather(lat, lon) {
    try {
        const response = await fetch(apis.get("current-weather") + `&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return;
    }
}

async function getWeatherData() {
    showLoading()
    const cityInInput = document.getElementById("search-txtbox").value;
    const cityInfo = await getCityInfo(cityInInput);

    if (cityInfo) {
        weatherData = await checkWeather(cityInfo[0].lat, cityInfo[0].lon);
    }

    // Set gotten weather data
    if (weatherData){
        console.log(weatherData)
        document.getElementsByClassName("temp")[0].innerHTML = (Math.round(weatherData.main.temp)).toString() + "°C";
        document.getElementsByClassName("city")[0].innerHTML = weatherData.name;
        document.getElementsByClassName("humidity")[0].innerHTML = weatherData.main.humidity + "%";
        document.getElementsByClassName("wind")[0].innerHTML = weatherData.wind.speed + " m/s";
    }
    hideLoading()
}