// Fetch weather information for preset cities on page load
const presetCities = ['Karachi', 'Lahore', 'Islamabad', 'Srinagar', 'Peshawar', 'Quetta'];

document.addEventListener('DOMContentLoaded', function () {
    for (const city of presetCities) {
        const rowId = city.replace(/\s+/g, '_');
        getWeather(city, rowId);
    }
});

document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const rowId = city.replace(/\s+/g, '_');
    displayElementInDiv(city)
    // getWeather(city, rowId);
});

function displayElementInDiv(city){
    const apiKey = '77879558e0f9f493979f70420fc4c849';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfoElement = document.getElementById('weatherInfo');

    if (data.cod === 404) {
        // If city not found, display an error message
        weatherInfoElement.innerHTML = `<span class="ml-2">${data.message}</span>`;
    } else {
        // Display weather information
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        const weatherInfo = `<span class="ml-2">Weather: ${weatherDescription}, Temperature: ${temperature}°C</span>`;
        weatherInfoElement.innerHTML += `<div class="alert alert-success" role="alert">${weatherInfo}</div>`;
    }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function getWeather(city, rowId) {
    const apiKey = '77879558e0f9f493979f70420fc4c849';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data, rowId);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data, rowId) {
    const weatherInfoElement = document.getElementById(rowId);

    if (data.cod === 404) {
        // If city not found, display an error message
        weatherInfoElement.innerHTML = `<span class="ml-2">${data.message}</span>`;
    } else {
        // Display weather information
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        const weatherInfo = `<span class="ml-2">Weather: ${weatherDescription}, Temperature: ${temperature}°C</span>`;
        weatherInfoElement.innerHTML += `<div class="alert alert-success congrats" role="alert">${weatherInfo}</div>`;
    }
}
