/* Color swap function */
const slate = document.getElementById("invader");
const colors = [
  "pixel__color-black",
  "pixel__color-grey",
  "pixel__color-white",
];

console.log(colors);

/* Game menu display function */
const gameMenu = function () {
  const form = document.getElementById("configuration");
  const palette = document.getElementById("palette");

  /* Input Init */
  const input = document.createElement("input");
  input.setAttribute("id", "input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "8");

  /* Button Init */
  const button = document.createElement("button");
  button.innerHTML = "GENERATE";
  button.addEventListener("click", onButtonClick);

  /* Input and button in DOM */
  form.append(input, button);

  /* On button click function */
  function onButtonClick(e) {
    e.preventDefault();
    let inputValue = document.getElementById("input").value;
    newSlate(inputValue);
    if (slate.firstChild) {
      while (slate.firstChild) {
        slate.removeChild(slate.firstChild);
      }
      newSlate(inputValue);
    }
  }

  for(let i = 0; i < colors.length; i++) {
    const color = document.createElement("div");
    color.setAttribute("class", "palette__color");
    palette.appendChild(color);
  }

};

/* New slate function */
function newSlate(size) {
  /* Default value if undefined */
  size = typeof message !== "undefined" ? message : "8";

  const colorSwap = function (evt) {
    if (evt.target.classList.contains(colors[0])) {
      evt.target.classList.replace(colors[0], colors[1]);
    } else if (evt.target.classList.contains(colors[1])) {
      evt.target.classList.replace(colors[1], colors[2]);
    } else if (evt.target.classList.contains(colors[2])) {
      evt.target.classList.replace(colors[2], colors[0]);
    } else {
      evt.target.classList.add(colors[0]);
    }
  };

  /* Loop to have x = size columns */
  for (let i = 0; i < size; i++) {
    /* Column Init */
    const col = document.createElement("div");
    col.classList.add("col");

    /* Column in DOM */
    slate.appendChild(col);

    /* Loop to have x = size pixels */
    for (let i = 0; i < size; i++) {
      /* Pixel Init */
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");

      /* Pixel in DOM */
      col.appendChild(pixel);

      pixel.addEventListener("click", colorSwap);
    }
  }
}

/* Game Menu Call */
gameMenu();
