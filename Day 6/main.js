const apiKey = "e89d201f169af183ba0f79f8f9cd4e8a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=";

checkWeather("jetalsar");
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + apiKey + `&q=${city}`);
    const data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
        document.body.style.backgroundImage = "url('bgImages/clouds.jpg')";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
        document.body.style.backgroundImage = "url('bgImages/clear.jpg')";
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/snow.png";
        document.body.style.backgroundImage = "url('bgImages/snow.jpg')";
    }else if (data.weather[0].main === "Smoke") {
        weatherIcon.src = "images/smoke.png";
        document.body.style.backgroundImage = "url('bgImages/smoke.jpg')";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
        document.body.style.backgroundImage = "url('bgImages/rain.jpg')";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        document.body.style.backgroundImage = "url('bgImages/drizzle.jpg')";
    } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Haze") {
        weatherIcon.src = "images/mist.png";
        document.body.style.backgroundImage = "url('bgImages/mist.jpg')";
    } else {
        document.body.style.backgroundImage = "url('bgImages/default.png')";
    }

// ...
}
searchbtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
