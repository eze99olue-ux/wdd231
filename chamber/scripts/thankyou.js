
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

        if (displayElement) {
            displayElement.textContent = submittedValue || "Not provided";
        }

    });

    // Retrieve and format the form timestamp.
    const timestampElement = document.getElementById("confirmed-timestamp");
    const submittedTimestamp = submittedData.get("timestamp");

    if (timestampElement) {

        if (submittedTimestamp) {

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

        } else {
            timestampElement.textContent = "Not available";
        }

    }

    // Check whether the page was reached through a form submission.
    const confirmationMessage = document.getElementById("confirmation-message");

    if (confirmationMessage) {

        if (!submittedData.has("firstName")) {

            confirmationMessage.textContent =
                "No application information was submitted. Please use the membership form to apply.";

        } else {

            confirmationMessage.textContent =
                "Your application details are displayed above.";

        }

    }

});
