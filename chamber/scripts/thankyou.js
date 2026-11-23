
// ========================================
// MEMBERSHIP APPLICATION CONFIRMATION
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // Read the submitted form information.
    const submittedData = new URLSearchParams(window.location.search);

    // Connect URL parameters to their display elements.
    const applicantFields = {
        firstName: "confirmed-first-name",
        lastName: "confirmed-last-name",
        email: "confirmed-email",
        phone: "confirmed-phone",
        organization: "confirmed-organization"
    };

    // Display each submitted value safely.
    Object.entries(applicantFields).forEach(([parameter, elementId]) => {

        const displayElement = document.getElementById(elementId);
        const submittedValue = submittedData.get(parameter);

        if (displayElement && submittedValue) {
            displayElement.textContent = submittedValue;
        }

    });

    // Retrieve and format the form timestamp.
    const timestampElement = document.getElementById("confirmed-timestamp");
    const submittedTimestamp = submittedData.get("timestamp");

    if (timestampElement && submittedTimestamp) {

        const applicationDate = new Date(submittedTimestamp);

        if (!Number.isNaN(applicationDate.getTime())) {

            timestampElement.textContent = applicationDate.toLocaleString(
                "en-NG",
                {
                    dateStyle: "long",
                    timeStyle: "short",
                    timeZone: "Africa/Lagos"
                }
            );

        } else {
            timestampElement.textContent = "Invalid date";
        }

    }

    // Check whether the page was reached through a form submission.
    const confirmationMessage = document.getElementById("confirmation-message");

    if (!submittedData.has("firstName")) {

        confirmationMessage.textContent =
            "No application information was submitted. Please use the membership form to apply.";

    }

});
