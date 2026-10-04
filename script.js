// PAGE NAVIGATION

const pages = document.querySelectorAll(".page");

function showPage(pageNumber) {
    pages.forEach(page => page.classList.remove("active"));

    document.getElementById(`page${pageNumber}`).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// FLOATING HEARTS BACKGROUND

const heartsBackground = document.getElementById("heartsBackground");
const heartSymbols = ["♥", "♡", "💕", "💗"];

function createFloatingHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent =
            heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (12 + Math.random() * 15) + "px";
        heart.style.animationDuration = (9 + Math.random() * 12) + "s";
        heart.style.animationDelay = (Math.random() * 12) + "s";

        heartsBackground.appendChild(heart);
    }
}

createFloatingHearts();


// PAGE 1: SURPRISE BUTTON

const surpriseButton = document.getElementById("surpriseButton");
const hintMessage = document.getElementById("hintMessage");

let attempts = 0;

const buttonPositions = [
    { left: "25%", top: "40%" },
    { left: "72%", top: "35%" },
    { left: "35%", top: "72%" },
    { left: "75%", top: "70%" }
];

const hintMessages = [
    "Oops! Try again, cutie! 😜",
    "Almost got it! Hehe! 💕",
    "Krishna is playing with you! 🦚",
    "One more try, swetie! 🥰"
];

surpriseButton.addEventListener("click", () => {
    if (attempts < 4) {
        const position = buttonPositions[attempts];

        surpriseButton.style.left = position.left;
        surpriseButton.style.top = position.top;

        hintMessage.textContent = hintMessages[attempts];

        attempts++;
    } else {
        showPage(2);
        updatePhoto();
    }
});


// PAGE 2: PHOTO GALLERY

const memories = [
    {
        src: "./photo1.jpg",
        caption: "Your smile makes everything beautiful. 💗"
    },
    {
        src: "./photo2.jpg",
        caption: "A little moment I want to remember forever. 🌸"
    },
    {
        src: "./photo3.jpg",
        caption: "My favorite person, always. 🥹"
    },
    {
        src: "./photo4.jpg",
        caption: "More beautiful memories are waiting for you. 💞"
    }
];

const galleryPhoto = document.getElementById("galleryPhoto");
const photoCaption = document.getElementById("photoCaption");
const photoCounter = document.getElementById("photoCounter");

const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");

const letterButton = document.getElementById("letterButton");
const galleryHint = document.getElementById("galleryHint");

let currentPhoto = 0;
let viewedPhotos = [false, false, false, false];

function updatePhoto() {
    galleryPhoto.src = memories[currentPhoto].src;
    galleryPhoto.alt = `Memory ${currentPhoto + 1}`;

    photoCaption.textContent = memories[currentPhoto].caption;
    photoCounter.textContent =
        `${currentPhoto + 1} / ${memories.length}`;

    // Mark current photo as viewed
    viewedPhotos[currentPhoto] = true;

    // Unlock letter after viewing every photo
    if (viewedPhotos.every(Boolean)) {
        letterButton.classList.remove("hidden");

        galleryHint.textContent =
            "You viewed all our memories! Here's a little letter. 💌";
    }
}

nextPhoto.addEventListener("click", () => {
    currentPhoto = (currentPhoto + 1) % memories.length;
    updatePhoto();
});

previousPhoto.addEventListener("click", () => {
    currentPhoto =
        (currentPhoto - 1 + memories.length) % memories.length;

    updatePhoto();
});

letterButton.addEventListener("click", () => {
    if (viewedPhotos.every(Boolean)) {
        showPage(3);
    }
});


// PAGE 3 TO PAGE 4

document.getElementById("finalPageButton").addEventListener("click", () => {
    showPage(4);
});


// PAGE 4 TO PAGE 5

document.getElementById("blessingPageButton").addEventListener("click", () => {
    showPage(5);
});


// PAGE 5: REPLAY

document.getElementById("replayButton").addEventListener("click", () => {
    // Reset surprise button
    attempts = 0;

    surpriseButton.style.left = "55%";
    surpriseButton.style.top = "57%";

    hintMessage.textContent = "Come on, catch the surprise! 🥰";

    // Reset gallery
    currentPhoto = 0;
    viewedPhotos = [false, false, false, false];

    letterButton.classList.add("hidden");

    galleryHint.textContent =
        "View all 4 photos to unlock your little message. 💌";

    updatePhoto();

    // Return to first page
    showPage(1);
});
