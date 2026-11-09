
// Display the current year
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Display the last modified date
const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
