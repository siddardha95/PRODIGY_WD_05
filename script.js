const apiKey = '10150f34cf4582f6b859e0ff4ac19e55';

function displayWeather(data) {
  const weatherDiv = document.getElementById('weather');

  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p style="color:red;">${data.message}</p>`;
    return;
  }

  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;

  weatherDiv.innerHTML = html;
}

function getWeatherByCity() {
  const city = document.getElementById('locationInput').value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => {
      console.error('Error fetching weather by city:', error);
      alert('Something went wrong. Please try again.');
    });
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
          console.error('Error fetching weather by location:', error);
          alert('Something went wrong. Please try again.');
        });

    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
