const folder = document.getElementById("folder");
const player = document.getElementById("player");
const video = document.getElementById("video");
const closeButton = document.getElementById("closeButton");

const music = document.getElementById("music");
const soundButton = document.getElementById("soundButton");

let musicEnabled = true;

// Volume de la musique de fond.
// 0.08 = très discret.
music.volume = 0.08;


// -------------------------
// Musique
// -------------------------

function startMusic() {
    if (!musicEnabled) return;

    music.play().catch(() => {
        // Les navigateurs peuvent bloquer l'autoplay.
        // Le premier clic sur le dossier permettra alors de la lancer.
    });
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


// -------------------------
// Ouverture du diaporama
// -------------------------

folder.addEventListener("click", async () => {

    player.classList.add("active");

    video.currentTime = 0;

    // Lance la musique après une interaction utilisateur
    if (musicEnabled) {
        music.play().catch(() => {});
    }

    video.play().catch(() => {});

    // Demande le plein écran
    try {
        if (player.requestFullscreen) {
            await player.requestFullscreen();
        }
    } catch (error) {
        console.log("Plein écran non disponible.");
    }
});


// -------------------------
// Fermeture
// -------------------------

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

closeButton.addEventListener("click", closePresentation);


// Échap
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (player.classList.contains("active")) {
            closePresentation();
        }
    }
});


// Lorsque l'utilisateur quitte le plein écran avec Échap
document.addEventListener("fullscreenchange", () => {

    if (!document.fullscreenElement &&
        player.classList.contains("active")) {

        video.pause();
        player.classList.remove("active");
    }
});


// Tentative de démarrage de la musique.
// Les navigateurs peuvent la bloquer jusqu'au premier clic.
window.addEventListener("load", startMusic);