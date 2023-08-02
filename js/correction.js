const app = {
  // Taille de la grille et des pixels
  gridSize: 8,
  pixelSize: 50,
  activeColor: "plain",

  // Element container pour notre grille de pixels
  board: document.getElementById("invader"),
  form: document.querySelector(".configuration"),

  // 4 styles possibles pour les couleurs
  styles: ["plain", "empty", "light", "highlight"],

  /**
   * Cette fonction initialise le board et démarre l'application
   */
  init: function () {
    app.drawBoard();
    app.drawFormulaire();
    app.drawPalette();
  },

  /**
   * Cette fonction permet de créer un <input type="text"> avec la possibilité
   * de définir un placeholder
   *
   * @param {string} placeholder  le texte d'aide a afficher dans l'inpur
   * @returns HTMLInputElement Le bouton crée
   */
  createInput: function (id, placeholder = "") {
    // Créer l'element
    let input = document.createElement("input");
    // ajouter le type, une classe, un placeholder
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", id);
    input.className = "input-text";

    // Retourne l'input crée a l'appelant
    return input;
  },

  /**
   * Cette fonction permet de créer un bouton de type <button>
   *
   * @param {string} textTitre
   * @returns HTMLButtonElement
   */
  createButton: function (textTitre) {
    // Créer l'element
    let button = document.createElement("button");
    button.textContent = textTitre;
    button.className = "input-button";

    return button;
  },

  /**
   * Function pour créer le board avec les lignes et les pixels
   */
  drawBoard: function () {
    // Nettoyage du tableau
    app.board.innerHTML = "";

    // Boucle de génération des lignes
    for (let i = 0; i < app.gridSize; i++) {
      // Créer une <div> ligne, y ajouter les pixels
      let ligne = document.createElement("div");
      //ligne.classList.add("ligne")
      ligne.className = "ligne";

      for (let j = 0; j < app.gridSize; j++) {
        // Créer un pixel
        let pixel = document.createElement("div");

        // On met la classe pixel et couleur, puis largeur/hauteur
        pixel.classList.add("pixel");

        pixel.style.width = app.pixelSize + "px";
        pixel.style.height = app.pixelSize + "px";
        // Ajout du pixel dans la ligne
        ligne.appendChild(pixel);
      }
      // Ajout de la ligne créée avec ses pixels
      app.board.appendChild(ligne);
    }
    app.board.addEventListener("click", app.handlePixelClick);
  },

  /**
   * Cette fonction gère le click sur un pixel du container 'invader'
   *
   * @param {Event} event
   */
  handlePixelClick: function (event) {
    const element = event.target;

    app.styles.forEach(function (style) {
      element.classList.remove("palette--" + style);
    });
    console.log(app.activeColor);
    element.classList.add("palette--" + app.activeColor);
  },

  /**
   * Fonction de création d'un formulaire avec les deux imput et le bouton
   */
  drawFormulaire: function () {
    // Création des deux input text
    const inputNbPixels = app.createInput("nb-pixels", "Taille de la grille");
    const inputSizPixels = app.createInput("size-pixels", "Taille des pixels");

    // Création du bouton valider
    const validation = app.createButton("Valider");

    // Ajout des elements du formulaire dans le container form
    app.form.appendChild(inputNbPixels);
    app.form.appendChild(inputSizPixels);
    app.form.appendChild(validation);

    app.form.addEventListener("submit", app.handleValidationClick);
  },

  /**
   * Cette function sert à gérer la validation du formulaire
   *
   * @param {PointerEvent} event L'evt a l'orinine de l'appel à la fonction
   */
  handleValidationClick: function (event) {
    event.preventDefault();

    let nbPixels = document.getElementById("nb-pixels");
    let sizPixels = document.getElementById("size-pixels");

    let valueNbPixels = Number(nbPixels.value);
    let valueSizPixels = Number(sizPixels.value);

    if (valueNbPixels && valueSizPixels) {
      app.gridSize = valueNbPixels;
      app.pixelSize = valueSizPixels;
      app.drawBoard();
    }
  },

  /**
   * Cette fonction permet de gérer la construction et l'affichage
   * de la palette de couleurs
   */
  drawPalette: function () {
    let palette = document.createElement("div");
    palette.className = "palette";

    app.styles.forEach(function (style) {
      // Création d'un élément anchor
      let anchor = document.createElement("a");
      // On ajoute le style inhérent a la couleur
      anchor.classList.add("palette-color", "palette--" + style);
      anchor.dataset.style = style;

      // Si la couleur actuellement séléctionné est la même que
      // celle de la boucle courante, alors on ajoute une classe
      // 'active-color' pour la différentier dans le document
      if (style == app.activeColor) {
        anchor.classList.add("active-color");
      }
      anchor.addEventListener("click", app.handleChangeCurrentColor);
      palette.appendChild(anchor);
    });
    document.body.appendChild(palette);
  },

  /**
   * Cette fonction gère l'événement click sur un bouton de
   * la palette de couleurs
   *
   * @param {Event} event
   */
  handleChangeCurrentColor: function (event) {
    const oldColor = document.querySelector(".active-color");
    oldColor.classList.remove("active-color");

    let newColor = event.target;
    newColor.classList.add("active-color");

    app.activeColor = event.target.dataset.style;
  },
};

app.init();
