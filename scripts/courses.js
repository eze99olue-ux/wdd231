
// =====================================
// WEB AND COMPUTER PROGRAMMING COURSES
// =====================================

// Set completed to true for courses you have passed.

const courses = [
    {
        subject: "CSE",
        courseNumber: 110,
        courseTitle: "Introduction to Programming",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        courseNumber: 130,
        courseTitle: "Web Fundamentals",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        courseNumber: 111,
        courseTitle: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        courseNumber: 210,
        courseTitle: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        courseNumber: 131,
        courseTitle: "Dynamic Web Fundamentals",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        courseNumber: 231,
        courseTitle: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

// =====================================
// SELECT HTML ELEMENTS
// =====================================

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");

const filterButtons = document.querySelectorAll(".filter-button");

// =====================================
// DISPLAY COURSES
// =====================================

function displayCourses(courseArray) {

    if (!courseList || !totalCredits) {
        return;
    }

    // Clear previous course cards

    courseList.innerHTML = "";

    // Generate a card for each course

    courseArray.forEach((course) => {

        const courseCard = document.createElement("article");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        const courseCode = document.createElement("p");

        courseCode.classList.add("course-code");

        courseCode.textContent =
            `${course.subject} ${course.courseNumber}`;

        const courseTitle = document.createElement("p");

        courseTitle.classList.add("course-title");

        courseTitle.textContent = course.courseTitle;

        const courseCredits = document.createElement("p");

        courseCredits.classList.add("course-credits");

        courseCredits.textContent =
            `${course.credits} Credits`;

        const courseStatus = document.createElement("p");

        courseStatus.classList.add("course-status");

        courseStatus.textContent = course.completed
            ? "Completed"
            : "Not Completed";

        courseCard.appendChild(courseCode);
        courseCard.appendChild(courseTitle);
        courseCard.appendChild(courseCredits);
        courseCard.appendChild(courseStatus);

        courseList.appendChild(courseCard);
    });

    // Calculate the credits of the currently displayed courses

    const credits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}

// =====================================
// FILTER COURSES
// =====================================

function filterCourses(subject) {

    let filteredCourses;

    if (subject === "all") {

        filteredCourses = courses;

    } else {

        filteredCourses = courses.filter(
            (course) => course.subject === subject
        );
    }

    displayCourses(filteredCourses);
}

// =====================================
// FILTER BUTTON EVENT LISTENERS
// =====================================

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Update active button

        filterButtons.forEach((filterButton) => {

            filterButton.classList.remove("active");

            filterButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");

        button.setAttribute("aria-pressed", "true");

        // Display the selected courses

        filterCourses(selectedFilter);
    });
});


displayCourses(courses);
