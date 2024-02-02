document.addEventListener("DOMContentLoaded", function () {
    // Add European cities to the dropdown
    const cities = ["Paris", "Berlin", "London", "Rome", "Madrid", "Vienna", "Amsterdam"];
    const citySelect = document.getElementById("citySelect");

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
});

async function getWeather() {
    const selectedCity = document.getElementById("citySelect").value;
    const apiKey = "c7f77e5846d9bc8b93c2c7e257aba269"; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.message || 'Unknown error');
        }
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    
    // Extract the first 7 entries in the 'list' array for the 7-day forecast
    const forecastData = data.list.slice(0, 7);

    let forecastHTML = '<h2>7-Day Forecast</h2>';

    forecastData.forEach(entry => {
        const date = new Date(entry.dt * 1000); // Convert timestamp to date
        const temperature = Math.round(entry.main.temp - 273.15); // Convert temperature from Kelvin to Celsius

        forecastHTML += `
            <div class="forecast-entry">
                <p>Date: ${date.toDateString()}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Weather: ${entry.weather[0].description}</p>
            </div>
        `;
    });

    weatherResult.innerHTML = forecastHTML;
}
