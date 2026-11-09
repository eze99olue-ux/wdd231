
const membersContainer = document.querySelector("#members-container");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const menuButton = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#primary-navigation");

function getMembershipName(level) {
    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}

function createMemberCard(member) {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.classList.add("member-image");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} business logo`;
    image.loading = "lazy";

    const details = document.createElement("div");
    details.classList.add("member-details");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const description = document.createElement("p");
    description.textContent = member.description;

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;

    const website = document.createElement("p");
    const websiteLink = document.createElement("a");

    websiteLink.href = member.website;
    websiteLink.textContent = "Visit Website";
    websiteLink.target = "_blank";
    websiteLink.rel = "noopener noreferrer";

    website.appendChild(websiteLink);

    const membership = document.createElement("p");
    membership.classList.add("membership-level");
    membership.textContent = getMembershipName(member.membershipLevel);

    details.append(
        name,
        description,
        address,
        phone,
        website,
        membership
    );

    card.append(image, details);

    return card;
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = createMemberCard(member);
        membersContainer.appendChild(card);
    });

    membersContainer.setAttribute("aria-busy", "false");
}

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member information.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        membersContainer.innerHTML = "";

        const message = document.createElement("p");

        message.classList.add("error-message");

        message.textContent =
            "Sorry, chamber members could not be loaded. Please try again later.";

        membersContainer.appendChild(message);

        membersContainer.setAttribute("aria-busy", "false");

        console.error("Member loading error:", error);
    }
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

getMembers();
