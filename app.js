const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", handleCM);
canvas.addEventListener("click", handleCM);

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeInput(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

range.addEventListener("input", handleRangeInput);

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
mode.addEventListener("click", handleModeClick);

function handleSaveBtnClick() {
  const image = canvas.toDataURL("image/jpeg"); // Default: imgage/png
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}
saveBtn.addEventListener("click", handleSaveBtnClick);
