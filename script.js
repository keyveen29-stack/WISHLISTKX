const folder = document.getElementById("folder");

const player = document.getElementById("player");
const video = document.getElementById("video");

const closeButton = document.getElementById("closeButton");

const playPause = document.getElementById("playPause");

const backward = document.getElementById("backward");
const forward = document.getElementById("forward");

const progress = document.getElementById("progress");

const time = document.getElementById("time");

const fullscreen = document.getElementById("fullscreen");

const music = document.getElementById("music");
const soundButton = document.getElementById("soundButton");

let musicEnabled = true;


// =========================
// MUSIQUE
// =========================

music.volume = 0.08;

function startMusic() {

    if (!musicEnabled) return;

    music.play().catch(() => {});
}

function toggleSound() {

    musicEnabled = !musicEnabled;

    if (musicEnabled) {

        music.volume = 0.08;

        music.play().catch(() => {});

        soundButton.textContent = "♪";

    } else {

        music.pause();

        soundButton.textContent = "×";
    }
}

soundButton.addEventListener("click", (event) => {

    event.stopPropagation();

    toggleSound();
});


// =========================
// OUVRIR LA PRÉSENTATION
// =========================

folder.addEventListener("click", async () => {

    player.classList.add("active");

    video.currentTime = 0;

    if (musicEnabled) {
        music.play().catch(() => {});
    }

    video.play().catch(() => {});

    try {

        if (player.requestFullscreen) {
            await player.requestFullscreen();
        }

    } catch (error) {

        console.log("Plein écran indisponible.");
    }
});


// =========================
// PLAY / PAUSE
// =========================

function togglePlay() {

    if (video.paused) {

        video.play();

    } else {

        video.pause();
    }
}

playPause.addEventListener("click", togglePlay);

video.addEventListener("play", () => {

    playPause.textContent = "❚❚";
});

video.addEventListener("pause", () => {

    playPause.textContent = "▶";
});


// =========================
// AVANCER / RECULER
// =========================

backward.addEventListener("click", () => {

    video.currentTime = Math.max(
        0,
        video.currentTime - 5
    );
});

forward.addEventListener("click", () => {

    video.currentTime = Math.min(
        video.duration,
        video.currentTime + 5
    );
});


// =========================
// BARRE DE PROGRESSION
// =========================

video.addEventListener("timeupdate", () => {

    if (!video.duration) return;

    progress.value =
        (video.currentTime / video.duration) * 100;

    time.textContent =
        formatTime(video.currentTime)
        + " / "
        + formatTime(video.duration);
});

progress.addEventListener("input", () => {

    if (!video.duration) return;

    video.currentTime =
        (progress.value / 100) * video.duration;
});


// =========================
// FORMAT DU TEMPS
// =========================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secondsPart}`;
}


// =========================
// PLEIN ÉCRAN
// =========================

fullscreen.addEventListener("click", async () => {

    try {

        if (!document.fullscreenElement) {

            await player.requestFullscreen();

        } else {

            await document.exitFullscreen();
        }

    } catch (error) {

        console.log("Impossible de changer le plein écran.");
    }
});


// =========================
// FERMER
// =========================

async function closePresentation() {

    video.pause();

    player.classList.remove("active");

    try {

        if (document.fullscreenElement) {
            await document.exitFullscreen();
        }

    } catch (error) {

        console.log("Impossible de quitter le plein écran.");
    }
}

closeButton.addEventListener(
    "click",
    closePresentation
);


// =========================
// RACCOURCIS CLAVIER
// =========================

document.addEventListener("keydown", (event) => {

    // Ne pas interférer avec le site quand le lecteur est fermé
    if (!player.classList.contains("active")) {
        return;
    }

    if (event.code === "Space") {

        event.preventDefault();

        togglePlay();
    }

    if (event.key === "ArrowLeft") {

        video.currentTime =
            Math.max(
                0,
                video.currentTime - 5
            );
    }

    if (event.key === "ArrowRight") {

        video.currentTime =
            Math.min(
                video.duration,
                video.currentTime + 5
            );
    }

    if (event.key === "Escape") {

        closePresentation();
    }
});


// =========================
// FIN DE LA VIDÉO
// =========================

video.addEventListener("ended", () => {

    playPause.textContent = "▶";
});


// =========================
// SORTIE DU PLEIN ÉCRAN
// =========================

document.addEventListener(
    "fullscreenchange",
    () => {

        if (
            !document.fullscreenElement &&
            player.classList.contains("active")
        ) {

            video.pause();

            player.classList.remove("active");
        }
    }
);