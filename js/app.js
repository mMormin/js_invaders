const app = {
  /* Global variables */
  form: document.getElementById("configuration"),
  slate: document.getElementById("invader"),
  colors: ["black", "blue", "green", "yellow"],
  activeColor: "black",
  gridSize: 8,
  pixelSize: 30,

  /**
   * Function init
   * to initialize the App
   */
  init: function () {
    app.gameMenu();
    app.gamePalette();
  },

  /**
   * Function createInput
   * to create an input with the params
   * @param {string} id
   * @param {string} placeholder
   * @returns input
   */
  createInput: function (id, placeholder = "") {
    /* Creation and props definition */
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", id);
    input.setAttribute("placeholder", placeholder);
    input.className = "input-text";

    return input;
  },

  /**
   * Function createButton
   * to create a button with the his name
   * @param {string} txt
   * @returns button
   */
  createButton: function (txt = "GENERATE") {
    /* Button creation and props definition */
    const button = document.createElement("button");
    button.textContent = txt;
    button.className = "input-button";
    return button;
  },

  /**
   * Function gameMenu
   * to create the form menu of the game
   */
  gameMenu: function () {
    /* Inputs and button creation */
    const pixelNumberInput = app.createInput(
      "nb-pixels",
      "Taille de la grille"
    );
    const pixelSizeInput = app.createInput("size-pixels", "Taille des pixels");
    const validateButton = app.createButton();

    /* Inputs and buttons to the DOM */
    app.form.appendChild(pixelNumberInput);
    app.form.appendChild(pixelSizeInput);
    app.form.appendChild(validateButton);

    /* Event Listener */
    app.form.addEventListener("submit", app.handleFormSubmit);
  },

  /**
   * Function newSlate
   * to create slate of the game with columns and pixels
   */
  newSlate: function () {
    // Clean of the slate
    app.slate.innerHTML = "";

    /* Loop to have "x = gridSize" columns */
    for (let i = 0; i < app.gridSize; i++) {
      /* Column Init */
      const col = document.createElement("div");
      col.classList.add("col");

      /* Column in DOM */
      app.slate.appendChild(col);

      /* Loop to have "x = gridSize" pixels */
      for (let i = 0; i < app.gridSize; i++) {
        /* Creation and props definition */
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.width = app.pixelSize + "px";
        pixel.style.height = app.pixelSize + "px";

        /* Pixel to the DOM */
        col.appendChild(pixel);

        /* Event Listener */
        pixel.addEventListener("click", app.handlePixelClick);
      }
    }
  },

  /**
   * Function gamePalette
   * to create the palette and display the colors
   */
  gamePalette: function () {
    /* Selector */
    const palette = document.getElementById("palette");

    /* For each colors, create a button with the defined color */
    app.colors.forEach(function (color) {
      /* Button creation and props definition */
      const colorSwapButton = document.createElement("a");
      colorSwapButton.className = "palette__color";
      colorSwapButton.classList.add("pixel__color--" + color);
      colorSwapButton.dataset.color = color;

      /* Define default color */
      if (color == app.activeColor) {
        colorSwapButton.classList.add("active-color");
      }

      /* Event Listener */
      colorSwapButton.addEventListener("click", app.handleCurrentColorChange);

      /* Palette to the DOM */
      palette.appendChild(colorSwapButton);
    });
  },

  /**
   * Function handlePixelClick
   * to handle the behavior when clicking on a pixel
   * @param {Event} event
   */
  handlePixelClick: function (evt) {
    const thisPixel = evt.target;

    app.colors.forEach(function (color) {
      thisPixel.classList.remove("pixel__color--" + color);
    });
    thisPixel.classList.add("pixel__color--" + app.activeColor);
  },

  /**
   * Function handleFormSubmit
   * to handle the form validation
   * @param {PointerEvent} event
   */
  handleFormSubmit: function (event) {
    event.preventDefault();

    /* Selectors */
    const pixelsNumber = document.getElementById("nb-pixels");
    const pixelsSize = document.getElementById("size-pixels");

    let pixelsNumberValue = Number(pixelsNumber.value);
    let pixelsSizeValue = Number(pixelsSize.value);

    if (pixelsNumberValue && pixelsSizeValue) {
      app.gridSize = pixelsNumberValue;
      app.pixelSize = pixelsSizeValue;
      app.newSlate();
    }
  },

  /**
   * Function handleCurrentColorChange
   * to handle the behavior of the color swapping in the palette
   * @param {Event} event
   */
  handleCurrentColorChange: function (event) {
    /* Selectors */
    const oldColor = document.querySelector(".active-color");
    let newColor = event.target;

    oldColor.classList.remove("active-color");
    newColor.classList.add("active-color");

    app.activeColor = event.target.dataset.color;
  },
};

app.init();
