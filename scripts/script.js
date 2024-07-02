import dayjs from 'https://unpkg.com/dayjs@1.11.11/esm/index.js';

function renderPage() {

  const inputEl = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', () => {
    displayWeather(inputEl);
  });
  
  inputEl.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      displayWeather(e.target)
    }
  });
  
};

async function displayWeather(inputEl) {
  const data = await fetchData(inputEl.value);
  const today = dayjs().format("MMMM D, YYYY");
  const weatherDetail = [
    {
      name: 'Wind',
      detail: `${(data.wind * 12.88).toFixed(2)} km/h`,
      icon: `wind`
    },
    {
      name: 'Humidity',
      detail: `${data.humidity}%`,
      icon: `droplet`
    }, {
      name: 'Feels Like',
      detail: `${data.feelsLike}°`,
      icon: `temperature-half`
    }
  ];
  if(data) {
    const weatherHTML = `
      <p class="date text-light-2 text-xs">${today}</p>
      <p class="city font-semibold text-2xl">${data.name}, ${data.country}</p>
      <img src="images/icons/${data.weatherMain}.png" alt="" class="mx-auto w-32 h-32">
      <p class="weather-temp text-6xl font-bold">${data.temp}°</p>
      <p class="weather-type tracking-wider">${data.description}</p>
    `;
    document.querySelector('.weather').innerHTML = weatherHTML;

    const weatherDetailsHTML = weatherDetail.map(weather => {
      return `
        <div class="wind flex flex-col gap-3 items-center flex-grow">
          <i class="fa-solid fa-${weather.icon}"></i>
          <p class="text-xs">${weather.detail}</p>
          <p class="text-light-2 text-xs">${weather.name}</p>
        </div>
      `
    }).join('');

    const weatherDetailContainer = document.querySelector('.weather-details');
    weatherDetailContainer.innerHTML = weatherDetailsHTML;
    weatherDetailContainer.style.background = 'rgba(0, 0, 0, .4)'
  }
}

async function fetchData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d6595b741ec28671b3a3c811eb5a731`);
    const data = await response.json();
    if(!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

    return {
      name: data.name,
      country: data.sys.country,
      weatherMain: data.weather[0].main,
      temp: (data.main.temp - 273.15).toFixed(0),
      description: data.weather[0].description,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      feelsLike: (data.main.feels_like - 273.15).toFixed(0)
    };
  } catch (err) {
    alert(err);
  }
}

renderPage();