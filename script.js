/* =========================================================
   JAIVI NAVRATRI — CINEMATIC SCRIPT
========================================================= */

const intro = document.getElementById("intro");
const introText = document.getElementById("introText");
const experience = document.getElementById("experience");

const music = document.getElementById("music");

const diyas = document.querySelectorAll(".memory-diya");
const memoryText = document.getElementById("memoryText");
const progressBar = document.getElementById("progressBar");
const continueButton = document.getElementById("continueButton");

const revealMemories = document.getElementById("revealMemories");
const finalMemories = document.getElementById("finalMemories");


/* =========================================================
   INTRO
========================================================= */

const introLines = [
    "Do you remember?",
    "Something feels different this Navratri…",
    "Because someone is missing."
];

let introIndex = 0;


function showIntro() {

    introText.style.opacity = "0";
    introText.style.transform = "translateY(15px)";

    setTimeout(() => {

        introText.textContent = introLines[introIndex];

        introText.style.opacity = "1";
        introText.style.transform = "translateY(0)";

        setTimeout(() => {

            introText.style.opacity = "0";
            introText.style.transform = "translateY(-15px)";

            setTimeout(() => {

                introIndex++;

                if (introIndex < introLines.length) {

                    showIntro();

                } else {

                    enterExperience();

                }

            }, 900);

        }, 3000);

    }, 700);
}


/* =========================================================
   ENTER EXPERIENCE
========================================================= */

function enterExperience() {

    intro.style.opacity = "0";
    intro.style.transform = "scale(1.04)";

    setTimeout(() => {

        intro.classList.add("hidden");

        experience.classList.remove("hidden");

        startMusic();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 1400);
}


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

    music.volume = 0.45;

    music.play().catch(() => {

        /*
           Some browsers block autoplay.

           The website still works normally.
           Music can start after the first interaction.
        */

        document.addEventListener(
            "click",
            unlockMusic,
            { once: true }
        );

    });

}


function unlockMusic() {

    music.volume = 0.45;

    music.play().catch(() => {});

}


/* =========================================================
   MOUSE PARALLAX
========================================================= */

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 2;


    document.querySelectorAll(".mandala").forEach(
        (mandala, index) => {

            const amount = index === 0 ? 12 : -10;

            mandala.style.marginLeft =
                `${x * amount}px`;

            mandala.style.marginTop =
                `${y * amount}px`;

        }
    );


    document.querySelectorAll(".bg-diya").forEach(
        (diya, index) => {

            const amount = 3 + index * 0.7;

            diya.style.marginLeft =
                `${x * amount}px`;

            diya.style.marginTop =
                `${y * amount}px`;

        }
    );

});


/* =========================================================
   DIYA MEMORY GAME
========================================================= */

let litCount = 0;


diyas.forEach((diya) => {

    diya.addEventListener("click", () => {

        if (diya.classList.contains("lit")) {
            return;
        }


        diya.classList.add("lit");

        litCount++;


        const message =
            diya.getAttribute("data-memory");

        memoryText.innerHTML =
            `<span>${message}</span>`;


        progressBar.style.width =
            `${(litCount / diyas.length) * 100}%`;


        createSparkBurst(diya);


        if (litCount === diyas.length) {

            setTimeout(() => {

                memoryText.innerHTML =
                    `<span>All the memories are lit. 🪔</span>`;

                continueButton.classList.remove("hidden");

                createBigLightBurst();

            }, 800);

        }

    });

});


/* =========================================================
   SPARK BURST
========================================================= */

function createSparkBurst(element) {

    const rect =
        element.getBoundingClientRect();


    for (let i = 0; i < 12; i++) {

        const spark =
            document.createElement("span");

        spark.style.position = "fixed";

        spark.style.left =
            `${rect.left + rect.width / 2}px`;

        spark.style.top =
            `${rect.top + rect.height / 2}px`;

        spark.style.width = "4px";
        spark.style.height = "4px";

        spark.style.borderRadius = "50%";

        spark.style.background = "#ffd27d";

        spark.style.boxShadow =
            "0 0 12px #ffb347";

        spark.style.pointerEvents = "none";

        spark.style.zIndex = "999";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            30 + Math.random() * 70;


        document.body.appendChild(spark);


        spark.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 700 + Math.random() * 300,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );


        setTimeout(() => {

            spark.remove();

        }, 1100);

    }

}


/* =========================================================
   BIG LIGHT BURST
========================================================= */

function createBigLightBurst() {

    const burst =
        document.createElement("div");

    burst.style.position = "fixed";
    burst.style.left = "50%";
    burst.style.top = "50%";

    burst.style.width = "20px";
    burst.style.height = "20px";

    burst.style.borderRadius = "50%";

    burst.style.background = "#ffd98b";

    burst.style.boxShadow =
        "0 0 30px #ffbd5c, 0 0 100px #ff7a18";

    burst.style.transform =
        "translate(-50%, -50%)";

    burst.style.pointerEvents = "none";

    burst.style.zIndex = "1000";

    document.body.appendChild(burst);


    burst.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(1)",
                opacity: 1
            },
            {
                transform:
                    "translate(-50%, -50%) scale(35)",
                opacity: 0
            }
        ],
        {
            duration: 1200,
            easing: "ease-out"
        }
    );


    setTimeout(() => {

        burst.remove();

    }, 1300);

}


/* =========================================================
   CONTINUE AFTER GAME
========================================================= */

continueButton.addEventListener("click", () => {

    const nextSection =
        document.querySelector(".memory-game + .memory");

    if (nextSection) {

        nextSection.scrollIntoView({
            behavior: "smooth"
        });

    }

    music.volume = 0.5;

});


/* =========================================================
   SCROLL REVEAL SYSTEM
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".memory-content, .game-content, .reveal-content, .distance-content, .final-content"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.2
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});


/* =========================================================
   PHOTO PARALLAX ON SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const photos =
        document.querySelectorAll(
            ".cinematic-memory img"
        );


    photos.forEach((photo) => {

        const rect =
            photo.parentElement.getBoundingClientRect();

        const center =
            window.innerHeight / 2;

        const distance =
            rect.top + rect.height / 2 - center;

        const movement =
            distance * -0.025;


        photo.style.transform =
            `scale(1.12) translateY(${movement}px)`;

    });

});


/* =========================================================
   JAIVI REVEAL EFFECT
========================================================= */

const jaiviSection =
    document.querySelector(".jaivi-reveal");

const jaiviName =
    document.querySelector(".reveal-content h1");


if (jaiviSection && jaiviName) {

    const jaiviObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        jaiviName.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "scale(.7) translateY(30px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "scale(1.08) translateY(0)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "scale(1) translateY(0)"
                                }
                            ],
                            {
                                duration: 1600,
                                easing:
                                    "cubic-bezier(.16,1,.3,1)",
                                fill: "forwards"
                            }
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    jaiviObserver.observe(jaiviSection);

}


/* =========================================================
   FINAL MEMORY REVEAL
========================================================= */

revealMemories.addEventListener("click", () => {

    finalMemories.classList.remove("hidden");


    setTimeout(() => {

        finalMemories.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);


    music.volume = 0.65;


    explodeFinalPhotos();

});


/* =========================================================
   FINAL PHOTO EXPLOSION
========================================================= */

function explodeFinalPhotos() {

    const cards =
        document.querySelectorAll(".photo-card");


    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "scale(.6) translateY(100px) rotate(0deg)";


        setTimeout(() => {

            card.style.opacity = "1";


            if (index === 0) {

                card.style.transform =
                    "rotate(-8deg) translateY(0)";

            }

            if (index === 1) {

                card.style.transform =
                    "translateX(-50%) rotate(1deg)";

            }

            if (index === 2) {

                card.style.transform =
                    "rotate(8deg) translateY(0)";

            }

        }, 300 + index * 300);

    });

}


/* =========================================================
   FINAL PHOTO HOVER
========================================================= */

document.querySelectorAll(".photo-card").forEach(
    (card) => {

        card.addEventListener("mouseenter", () => {

            music.volume = 0.7;

        });

        card.addEventListener("mouseleave", () => {

            music.volume = 0.6;

        });

    }
);


/* =========================================================
   RANDOM FLOATING SPARKS
========================================================= */

function createAmbientSpark() {

    const spark =
        document.createElement("div");

    spark.style.position = "fixed";

    spark.style.left =
        `${Math.random() * 100}vw`;

    spark.style.bottom = "-10px";

    const size =
        2 + Math.random() * 3;

    spark.style.width =
        `${size}px`;

    spark.style.height =
        `${size}px`;

    spark.style.borderRadius = "50%";

    spark.style.background =
        "#ffd58c";

    spark.style.boxShadow =
        "0 0 10px rgba(255,180,70,.8)";

    spark.style.pointerEvents = "none";

    spark.style.zIndex = "4";


    document.body.appendChild(spark);


    const duration =
        5000 + Math.random() * 5000;


    spark.animate(
        [
            {
                transform: "translateY(0)",
                opacity: 0
            },
            {
                transform:
                    `translateY(-${window.innerHeight * 1.1}px)`,
                opacity: .8
            },
            {
                transform:
                    `translateY(-${window.innerHeight * 1.2}px)`,
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );


    setTimeout(() => {

        spark.remove();

    }, duration + 100);

}


setInterval(
    createAmbientSpark,
    700
);


/* =========================================================
   PAGE START
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showIntro();

    }, 1000);

});

