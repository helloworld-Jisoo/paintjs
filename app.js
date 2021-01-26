const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors= document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

// Default variables
const DEFAULT_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = DEFAULT_COLOR;


let painting = false;
let filling = false;

function stopPainting(){
  painting=false;
}

function startPainting(){
  painting=true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
    // <lineTo and Stroke> happens everytime I move the mouse.
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // overriding ctx.strokeStyle
  ctx.fillStyle = color;
}
function handleRangeChange(event) {
  const inputValue = event.target.value;
  ctx.lineWidth = inputValue; // overriding ctx.lineWidth
}
function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}
function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}
function handleCM(event){
  event.preventDefault();
}
function handleSaveClick(){
const image = canvas.toDataURL();
const link = document.createElement("a");
link.href = image;
link.download = "🎨 PAINT JS 🎨"
link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
}

// Make array(Palette) from each colors, and when they are clicked -> call the function(handleColorClick)
Array.from(colors).forEach(palette => palette.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}
if(save){
  save.addEventListener("click", handleSaveClick);
}