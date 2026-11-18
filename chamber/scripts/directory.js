
/* =========================================
   ABUJA CHAMBER - DIRECTORY JAVASCRIPT
========================================= */

const membersContainer =
    document.querySelector("#members-container");

const gridButton =
    document.querySelector("#grid-view");

const listButton =
    document.querySelector("#list-view");


// Load chamber members
async function getMembers() {

    if (!membersContainer) return;

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load chamber members.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Directory error:", error);

        membersContainer.innerHTML = `
            <p class="error-message">
                Unable to load business members.
                Please try again later.
            </p>
        `;

    } finally {

        membersContainer.setAttribute("aria-busy", "false");

    }
}


// Display members
function displayMembers(members) {

    membersContainer.innerHTML = members.map(member => {

        const level = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        }[Number(member.membershipLevel)] || "Member";

        const website = /^https?:\/\//i.test(member.website)
            ? member.website
            : `https://${member.website}`;

        const phoneLink = member.phone.replace(/[^\d+]/g, "");

        return `

            <article class="member-card">

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    width="100"
                    height="85"
                    loading="lazy">

                <h3>${member.name}</h3>

                <div class="member-details">

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
                        <a href="${website}"
                            target="_blank"
                            rel="noopener noreferrer">
                            Visit Website
                        </a>
                    </p>

                    <p class="membership-level">
                        ${level} Membership
                    </p>

                </div>

            </article>

        `;

    }).join("");

}


// Grid view
if (gridButton && listButton && membersContainer) {

    gridButton.addEventListener("click", () => {

        membersContainer.classList.remove("members-list");
        membersContainer.classList.add("members-grid");

        gridButton.classList.add("active");
        listButton.classList.remove("active");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");

    });


    // List view
    listButton.addEventListener("click", () => {

        membersContainer.classList.remove("members-grid");
        membersContainer.classList.add("members-list");

        listButton.classList.add("active");
        gridButton.classList.remove("active");

        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");

    });

}


// Mobile navigation
const menuButton = document.querySelector("#menu-toggle");

const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const expanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

        navigation.classList.toggle("open");

        menuButton.querySelector("span").textContent =
            expanded ? "☰" : "✕";

    });

}


// Initialize
getMembers();
