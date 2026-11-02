
// Responsive navigation menu

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close the menu after selecting a navigation link

    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuButton.setAttribute("aria-expanded", "false");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}
