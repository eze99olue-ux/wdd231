
// ========================================
// CHAMBER MEMBERSHIP APPLICATION
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // Record the date and time when the form loads.
    const timestampField = document.querySelector("#formTimestamp");

    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Find all membership information buttons.
    const benefitButtons = document.querySelectorAll("[data-dialog]");

    benefitButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const dialogId = button.dataset.dialog;
            const selectedDialog = document.getElementById(dialogId);

            if (selectedDialog) {
                selectedDialog.showModal();
            }

        });

    });

    // Set up all membership dialogs.
    const membershipDialogs = document.querySelectorAll(".benefit-dialog");

    membershipDialogs.forEach((dialog) => {

        // Close using the close button.
        const closeButton = dialog.querySelector(".dialog-close");

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                dialog.close();
            });
        }

        // Close when the user clicks the backdrop.
        dialog.addEventListener("click", (event) => {

            if (event.target === dialog) {
                dialog.close();
            }

        });

    });

});
