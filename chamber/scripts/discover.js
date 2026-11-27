import { places } from "../data/places.mjs";

const grid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");
const visitKey = "abujaDiscoverLastVisit";
const now = Date.now();

function showVisitMessage() {
    try {
        const previousVisit = localStorage.getItem(visitKey);

        if (!previousVisit) {
            visitMessage.textContent =
                "Welcome! Let us know if you have any questions.";
        } else {
            const elapsed = now - Number(previousVisit);
            const dayInMilliseconds = 24 * 60 * 60 * 1000;

            if (elapsed < dayInMilliseconds) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else {
                const days = Math.floor(elapsed / dayInMilliseconds);
                const dayWord = days === 1 ? "day" : "days";

                visitMessage.textContent =
                    `You last visited ${days} ${dayWord} ago.`;
            }
        }

        localStorage.setItem(visitKey, String(now));
    } catch (error) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    }
}

function createPlaceCard(place, index) {
    const card = document.createElement("article");
    card.className = `discover-card place-${index + 1}`;

    const mapUrl =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ", Abuja, Nigeria")}`;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                width="300"
                height="200"
                loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <a class="learn-more" href="${mapUrl}"
            target="_blank" rel="noopener noreferrer">
            Learn More
        </a>
    `;

    return card;
}

function displayPlaces() {
    if (!grid) return;

    grid.replaceChildren();

    places.forEach((place, index) => {
        grid.appendChild(createPlaceCard(place, index));
    });

    grid.setAttribute("aria-busy", "false");
}

showVisitMessage();
displayPlaces();