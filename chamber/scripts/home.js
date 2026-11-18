
/* =========================================
   ABUJA CHAMBER OF COMMERCE
   HOME PAGE JAVASCRIPT
========================================= */

// OpenWeatherMap configuration
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const LATITUDE = 9.0765;
const LONGITUDE = 7.3986;

const WEATHER_TIME_ZONE = "Africa/Lagos";

// =========================================
// WEATHER FUNCTIONS
// =========================================

async function getWeather() {

    const currentContainer =
        document.querySelector("#current-weather");

    const forecastContainer =
        document.querySelector("#weather-forecast");

    const currentURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

    try {

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentURL),
                fetch(forecastURL)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather information could not be retrieved.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {

        console.error("Weather error:", error);

        currentContainer.innerHTML =
            "<p>Current weather is temporarily unavailable.</p>";

        forecastContainer.innerHTML =
            "<p>Weather forecast is temporarily unavailable.</p>";

    } finally {

        currentContainer.setAttribute("aria-busy", "false");
        forecastContainer.setAttribute("aria-busy", "false");

    }
}


// Display current weather information
function displayCurrentWeather(data) {

    const container =
        document.querySelector("#current-weather");

    const temperature = Math.round(data.main.temp);

    const feelsLike = Math.round(data.main.feels_like);

    const humidity = data.main.humidity;

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    container.innerHTML = `

        <div class="current-weather-info">

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="90"
                height="90">

            <div>
                <p class="weather-temperature">
                    ${temperature}°C
                </p>

                <p class="weather-description">
                    ${description}
                </p>
            </div>

        </div>

        <div class="weather-details">

            <p>
                <strong>Feels Like:</strong>
                ${feelsLike}°C
            </p>

            <p>
                <strong>Humidity:</strong>
                ${humidity}%
            </p>

            <p>
                <strong>Location:</strong>
                Abuja, Nigeria
            </p>

        </div>

    `;
}


// Get Abuja's current calendar date
function getAbujaDate() {

    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: WEATHER_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date());

    const values = {};

    parts.forEach(part => {
        values[part.type] = part.value;
    });

    return `${values.year}-${values.month}-${values.day}`;
}


// Display the next three days of weather
function displayForecast(data) {

    const container =
        document.querySelector("#weather-forecast");

    const today = getAbujaDate();

    const dailyForecasts = {};

    // Group forecast data by Abuja calendar date
    data.list.forEach(item => {

        const localDate = new Date(
            (item.dt + data.city.timezone) * 1000
        ).toISOString().slice(0, 10);

        if (localDate <= today) return;

        if (!dailyForecasts[localDate]) {
            dailyForecasts[localDate] = [];
        }

        dailyForecasts[localDate].push(item);

    });

    // Get the next three available forecast days
    const dates = Object.keys(dailyForecasts)
        .sort()
        .slice(0, 3);

    if (dates.length < 3) {
        container.innerHTML =
            "<p>Three-day forecast is not currently available.</p>";
        return;
    }

    const forecastHTML = dates.map(date => {

        const readings = dailyForecasts[date];

        // Select the reading closest to midday
        const middayReading = readings.reduce((closest, item) => {

            const hour = new Date(
                (item.dt + data.city.timezone) * 1000
            ).getUTCHours();

            const closestHour = new Date(
                (closest.dt + data.city.timezone) * 1000
            ).getUTCHours();

            return Math.abs(hour - 12) <
                Math.abs(closestHour - 12)
                ? item
                : closest;

        });

        const dayName = new Date(
            `${date}T12:00:00`
        ).toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: WEATHER_TIME_ZONE
        });

        const temperature =
            Math.round(middayReading.main.temp);

        const description =
            middayReading.weather[0].description;

        const icon =
            middayReading.weather[0].icon;

        return `

            <div class="forecast-day">

                <h4>${dayName}</h4>

                <img
                    src="https://openweathermap.org/img/wn/${icon}.png"
                    alt="${description}"
                    width="55"
                    height="55"
                    loading="lazy">

                <p class="forecast-temperature">
                    ${temperature}°C
                </p>

                <p class="forecast-description">
                    ${description}
                </p>

            </div>

        `;

    }).join("");

    container.innerHTML = forecastHTML;
}


// =========================================
// BUSINESS SPOTLIGHT FUNCTIONS
// =========================================

// Fisher-Yates shuffle
function shuffleMembers(members) {

    const shuffled = [...members];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];

    }

    return shuffled;
}


// Load Gold and Silver business members
async function getSpotlights() {

    const container =
        document.querySelector("#spotlight-container");

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load chamber members.");
        }

        const members = await response.json();

        // Membership level 3 = Gold
        // Membership level 2 = Silver
        const qualifiedMembers = members.filter(member =>
            Number(member.membershipLevel) === 2 ||
            Number(member.membershipLevel) === 3
        );

        // Randomize qualifying members
        const shuffledMembers =
            shuffleMembers(qualifiedMembers);

        // Select three members
        const selectedMembers =
            shuffledMembers.slice(0, 3);

        if (selectedMembers.length === 0) {

            container.innerHTML =
                "<p>No Gold or Silver members are available.</p>";

            return;
        }

        container.innerHTML = selectedMembers.map(member => {

            const level =
                Number(member.membershipLevel) === 3
                    ? "Gold"
                    : "Silver";

            const website = /^https?:\/\//i.test(member.website)
                ? member.website
                : `https://${member.website}`;

            const phoneLink =
                member.phone.replace(/[^\d+]/g, "");

            return `

                <article class="spotlight-card">

                    <div class="spotlight-logo">

                        <img
                            src="images/${member.image}"
                            alt="${member.name} logo"
                            width="100"
                            height="85"
                            loading="lazy">

                    </div>

                    <span class="membership-badge ${level.toLowerCase()}">
                        ${level} Member
                    </span>

                    <h3>${member.name}</h3>

                    <p class="spotlight-description">
                        ${member.description || ""}
                    </p>

                    <div class="spotlight-details">

                        <p>
                            <strong>Address:</strong>
                            ${member.address}
                        </p>

                        <p>
                            <strong>Phone:</strong>

                            <a href="tel:${phoneLink}">
                                ${member.phone}
                            </a>
                        </p>

                        <p>
                            <strong>Website:</strong>

                            <a
                                href="${website}"
                                target="_blank"
                                rel="noopener noreferrer">
                                Visit Website
                            </a>
                        </p>

                    </div>

                </article>

            `;

        }).join("");

    } catch (error) {

        console.error("Spotlight error:", error);

        container.innerHTML =
            "<p>Business spotlights are temporarily unavailable.</p>";

    } finally {

        container.setAttribute("aria-busy", "false");

    }
}


// =========================================
// RESPONSIVE NAVIGATION
// =========================================

function setupNavigation() {

    const menuButton =
        document.querySelector("#menu-toggle");

    const navigation =
        document.querySelector("#primary-navigation");

    if (!menuButton || !navigation) return;

    const menuIcon = menuButton.querySelector("span");

    menuButton.addEventListener("click", () => {

        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        navigation.classList.toggle("open");

        menuIcon.textContent = isExpanded ? "☰" : "✕";

        menuButton.setAttribute(
            "aria-label",
            isExpanded
                ? "Open navigation menu"
                : "Close navigation menu"
        );

    });

}


// =========================================
// INITIALIZE HOME PAGE
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    setupNavigation();

    getWeather();

    getSpotlights();

});
