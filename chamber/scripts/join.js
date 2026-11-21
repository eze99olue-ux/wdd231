
// =========================================
// JOIN PAGE JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // Set the application submission timestamp
    const timestampField = document.querySelector("#timestamp");

    if (timestampField) {
        timestampField.value = new Date().toISOString();
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

    // Open membership information dialogs
    const modalButtons = document.querySelectorAll("[data-modal]");

    modalButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.showModal();
            }

        });

    });

    // Close dialogs using their close buttons
    const closeButtons = document.querySelectorAll(".close-modal");

    closeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const dialog = button.closest("dialog");

            if (dialog) {
                dialog.close();
            }

        });

    });

    // Close a dialog when clicking outside its content
    const dialogs = document.querySelectorAll(".membership-dialog");

    dialogs.forEach((dialog) => {

        dialog.addEventListener("click", (event) => {

            if (event.target === dialog) {
                dialog.close();
            }

        });

    });

});
