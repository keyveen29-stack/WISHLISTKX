/* =========================================
   MOT DE PASSE
========================================= */

const BON_MOT_DE_PASSE = "KX";

const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");


function verifierMotDePasse() {

  const valeur = passwordInput.value
    .trim()
    .toUpperCase();


  if (valeur === BON_MOT_DE_PASSE) {

    passwordError.classList.remove("show");

    passwordScreen.classList.add("hidden");

    // On évite que la page principale soit scrollable
    // pendant l'animation d'entrée
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      document.body.style.overflow = "";
    }, 650);

  } else {

    passwordError.classList.add("show");

    passwordInput.value = "";

    passwordInput.focus();

    // Petite animation d'erreur
    passwordInput.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-7px)" },
        { transform: "translateX(7px)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 280
      }
    );

  }

}


/* =========================================
   VALIDATION AVEC LA TOUCHE ENTRÉE
========================================= */

passwordInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    verifierMotDePasse();
  }

});


/* =========================================
   OUVRIR UN FILM
========================================= */

function ouvrirFilm(url) {

  const lecteur = document.getElementById("lecteur");
  const video = document.getElementById("video");

  video.src = url;

  lecteur.classList.add("active");

  document.body.style.overflow = "hidden";

}


/* =========================================
   FERMER LE FILM
========================================= */

function fermerFilm() {

  const lecteur = document.getElementById("lecteur");
  const video = document.getElementById("video");

  video.src = "";

  lecteur.classList.remove("active");

  document.body.style.overflow = "";

}


/* =========================================
   ESCAPE POUR FERMER LE LECTEUR
========================================= */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    fermerFilm();
  }

});


/* =========================================
   CLIQUER EN DEHORS DE LA VIDÉO POUR FERMER
========================================= */

document.getElementById("lecteur").addEventListener(
  "click",
  function(event) {

    if (event.target === this) {
      fermerFilm();
    }

  }
);


/* =========================================
   ADAPTATION À LA ROTATION DU TÉLÉPHONE
========================================= */

window.addEventListener("orientationchange", function() {

  // Petit délai pour laisser le navigateur
  // recalculer correctement le viewport.
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 150);

});