
const membersContainer = document.querySelector("#members-container");
const memberCount = document.querySelector("#member-count");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const menuButton = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#primary-navigation");

// Return the membership name and CSS class.
function getMembershipName(level) {
    if (level === 3) {
        return {
            name: "Gold Member",
            className: "gold"
        };
    }

    if (level === 2) {
        return {
            name: "Silver Member",
            className: "silver"
        };
    }

    return {
        name: "Member",
        className: "member"
    };
}

// Create an individual business card.
function createMemberCard(member) {
    const card = document.createElement("article");
    card.className = "member-card";

    const image = document.createElement("img");
    image.className = "member-image";
    image.src = `images/${member.image}`;
    image.alt = `${member.name} business image`;
    image.loading = "lazy";
    image.width = 400;
    image.height = 150;

    const heading = document.createElement("h3");
    heading.textContent = member.name;

    const description = document.createElement("p");
    description.className = "member-description";
    description.textContent = member.description;

    const details = document.createElement("div");
    details.className = "member-details";

    const address = document.createElement("p");
    const addressLabel = document.createElement("strong");
    addressLabel.textContent = "Address: ";
    address.append(addressLabel, document.createTextNode(member.address));

    const phone = document.createElement("p");
    const phoneLabel = document.createElement("strong");
    phoneLabel.textContent = "Phone: ";
    phone.append(phoneLabel, document.createTextNode(member.phone));

    const membership = getMembershipName(
        Number(member.membershipLevel)
    );

    const membershipBadge = document.createElement("span");
    membershipBadge.className = `membership ${membership.className}`;
    membershipBadge.textContent = membership.name;

    const website = document.createElement("a");
    website.className = "website-link";
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    details.append(address, phone);

    card.append(
        image,
        heading,
        description,
        details,
        membershipBadge,
        website
    );

    return card;
}

// Display all business members.
function displayMembers(members) {
    membersContainer.innerHTML = "";

    if (!Array.isArray(members) || members.length === 0) {
        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent =
            "No business members are currently available.";

        membersContainer.appendChild(message);

        if (memberCount) {
            memberCount.textContent = "No members found.";
        }

        return;
    }

    const fragment = document.createDocumentFragment();

    members.forEach((member) => {
        fragment.appendChild(createMemberCard(member));
    });

    membersContainer.appendChild(fragment);

    if (memberCount) {
        memberCount.textContent =
            `Showing ${members.length} business members`;
    }

    membersContainer.setAttribute("aria-busy", "false");
}

// Switch between grid and list layouts.
function setView(view) {
    const isGrid = view === "grid";

    membersContainer.classList.toggle("members-grid", isGrid);
    membersContainer.classList.toggle("members-list", !isGrid);

    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);

    gridButton.setAttribute("aria-pressed", String(isGrid));
    listButton.setAttribute("aria-pressed", String(!isGrid));
}

// Fetch business members from the JSON file.
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `Unable to load members: ${response.status}`
            );
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading business members:", error);

        membersContainer.innerHTML = "";

        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent =
            "We could not load the business directory. Please try again later.";

        membersContainer.appendChild(message);
        membersContainer.setAttribute("aria-busy", "false");

        if (memberCount) {
            memberCount.textContent = "Directory unavailable.";
        }
    }
}

// Grid and list button events.
gridButton.addEventListener("click", () => {
    setView("grid");
});

listButton.addEventListener("click", () => {
    setView("list");
});

// Mobile navigation menu.
menuButton.addEventListener("click", () => {
    const isExpanded =
        menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isExpanded));

    menuButton.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation menu" : "Close navigation menu"
    );

    mainNav.classList.toggle("open");
});

// Load members when the page opens.
loadMembers();
