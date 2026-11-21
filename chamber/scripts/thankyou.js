
// =========================================
// THANK YOU PAGE JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // Read submitted form information from the URL
    const params = new URLSearchParams(window.location.search);

    // Display submitted information safely
    const displayFields = {
        "display-first-name": "firstName",
        "display-last-name": "lastName",
        "display-email": "email",
        "display-phone": "phone",
        "display-organization": "organization"
    };

    Object.entries(displayFields).forEach(([elementId, parameter]) => {

        const element = document.getElementById(elementId);
        const value = params.get(parameter);

        if (element) {
            element.textContent = value || "Not provided";
        }

    });

    // Display the application timestamp
    const timestampElement =
        document.getElementById("display-timestamp");

    const timestamp = params.get("timestamp");

    if (timestampElement) {

        if (timestamp) {

            const date = new Date(timestamp);

            timestampElement.textContent =
                Number.isNaN(date.getTime())
                    ? "Invalid date"
                    : date.toLocaleString();

        } else {

            timestampElement.textContent = "Not provided";

        }

    }

    // Mobile navigation menu
    const menuToggle = document.querySelector("#menu-toggle");
    const navigation = document.querySelector("#primary-navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isExpanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            navigation.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-label",
                isExpanded
                    ? "Open navigation menu"
                    : "Close navigation menu"
            );

        });

    }

});
