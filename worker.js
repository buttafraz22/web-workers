// worker.js

function displayWeather(data, rowId) {
    const weatherInfoElement = document.getElementById(rowId);
    if (!weatherInfoElement) {
        console.error(`Element with id ${rowId} not found in the DOM.`);
        return;
    }

    if (data.cod === 404) {
        weatherInfoElement.innerHTML = `<span class="ml-2">${data.message}</span>`;
    } else {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        const weatherInfo = `<span class="ml-2">Weather: ${weatherDescription}, Temperature: ${temperature}°C</span>`;
        weatherInfoElement.innerHTML += `<div class="alert alert-success congrats" role="alert">${weatherInfo}</div>`;
    }
}

self.addEventListener('message', function (event) {
    const { city, rowId } = event.data;
    const apiKey = '77879558e0f9f493979f70420fc4c849';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            self.postMessage({ data, rowId });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
