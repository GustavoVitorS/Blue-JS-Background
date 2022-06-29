/*Modify the script to make the background your way*/

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 3;
    this.done = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 9);
    setRandomColor();
    ctx.fill();
  }
}

let canvas;
let ctx;
let w, h;
let circles;
let colors;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", () => {
    reset();
    draw();
  });
  colors = [
    "#3AB0FF",
    "#1363DF",
    "#7FB5FF",
    "#30AADD",
    "#56BBF1",
    "#85F4FF"
  ];
  canvas.addEventListener("click", draw);
}

function setRandomColor() {
  let index = Math.floor(Math.random() * colors.length);
  let color = colors[index];

  ctx.fillStyle = color;
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function clear() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function addCircles() {
  let nrOfTries = 0;
  let wasAdded;
  do {
    wasAdded = false;
    let x = Math.random() * w;
    let y = Math.random() * h;
    if (validPos(x, y)) {
      wasAdded = true;
      let c = new Circle(x, y);
      circles.push(c);
    }
    nrOfTries++;
  } while (!wasAdded && nrOfTries < 110)
}

function validPos(x, y) {
  for (let i = 0; i < circles.length; i++) {
    let current = circles[i];
    let d = dist(x, y, current.x, current.y);
    if (d - 6 < current.r) {
      return false;
    }
  }
  return true;
}

function canGrow(circle) {
  for (let i = 0; i < circles.length; i++) {
    let current = circles[i];
    if (circle !== current) {
      let d = dist(circle.x, circle.y, current.x, current.y);
      if (d - 6 <= circle.r + current.r) {
        return false;
      }
    }
  }
  return true;
}

function resetCircles() {
  circles = [];
}

function packCircles() {
  let nrOfTries = w * h / 222;
  for (let i = 0; i < nrOfTries; i++) {
    if (i % 5 === 0) {
      addCircles();
    }
    circles.filter(c => !c.done).forEach(c => {
      if (canGrow(c)) {
        c.r += 4;
      } else {
        c.done = true;
      }
    });
  }
}

function drawCircles() {
  circles.forEach(c => c.draw());
}

function draw() {
  clear();
  resetCircles();
  packCircles();
  drawCircles();
}

setup();
draw();
