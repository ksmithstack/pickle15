// load font
let myFont;
function preload() {
  myFont = loadFont("Benguiat Bold.ttf");
  mySong = loadSound("synthwave_complete.mp3");
}

// set var
let cenX = 0;
let cenY = 0;
let scale = 1;

// based on JAC code - thank you kindly
function setup() {
  //mySong.loop();
  //mySong.setVolume(0.1);
  // MandleBrot
  //createCanvas(1280, 720); // HD
  createCanvas(640, 360); //SD

  noStroke();
  colorMode(HSB);
  drawBrot();

  // buttons
  button1 = createButton("left arrow");
  button1.position(0, 220);
  button2 = createButton("right arrow");
  button2.position(0, 240);
  button3 = createButton("up arrow");
  button3.position(0, 260);
  button4 = createButton("down arrow");
  button4.position(0, 280);
  button5 = createButton("zoom in");
  button5.position(0, 300);
  button6 = createButton("zoom out");
  button6.position(0, 320);
  button7 = createButton("play synthwave");
  button7.position(0, 340);
  button1.mousePressed(moveLeft);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveUp);
  button4.mousePressed(moveDown);
  button5.mousePressed(zoomIn);
  button6.mousePressed(zoomOut);
  button7.mousePressed(synth);
}
function draw() {
  // greeting with ST font and color
  textFont("Benguiat Bold");
  textSize(50);
  stroke(358, 85, 52, 102);
  strokeWeight(2);
  fill(358, 55, 100);
  textAlign(CENTER, TOP);
  text("Happy Birthday Pickle", 10, 20, width);
  textSize(10);
  fill(358, 0, 100);
  text("Beyond the dark there is infinite colour", 10, 70, width);

  // move and zoom arrow, + and -
  let redraw = false;
  if (keyIsDown(LEFT_ARROW)) {
    cenX -= (0.5 * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cenX += (0.5 * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(UP_ARROW)) {
    cenY -= (0.5 * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(DOWN_ARROW)) {
    cenY += (0.5 * 1) / scale;
    redraw = true;
  }
  if (keyIsDown(107) || keyIsDown(187)) {
    scale += scale * 0.5;
    redraw = true;
  }
  if (keyIsDown(109) || keyIsDown(189)) {
    scale -= scale * 0.5;
    redraw = true;
  }
  textSize(10);
  textFont("Courier New");
  noStroke();
  fill(358, 0, 100);
  text("Scale: " + scale, 50, 200);

  // redraw if true
  if (redraw) {
    drawBrot();
  }
}
function moveLeft() {
  let redraw = false;
  cenX -= (0.5 * 1) / scale;
  redraw = true;
  if (redraw) {
    drawBrot();
  }
}
function moveRight() {
  let redraw = false;
  cenX += (0.5 * 1) / scale;
  redraw = true;
  if (redraw) {
    drawBrot();
  }
}
function moveUp() {
  let redraw = false;
  cenY -= (0.5 * 1) / scale;
  redraw = true;
  if (redraw) {
    drawBrot();
  }
}
function moveDown() {
  let redraw = false;
  cenY += (0.5 * 1) / scale;
  redraw = true;
  if (redraw) {
    drawBrot();
  }
}
function zoomIn() {
  let redraw = false;
  scale += scale * 0.5;
  redraw = true;
  if (redraw) {
    drawBrot();
  }
}
function zoomOut() {
  scale -= scale * 0.5;
  redraw = true;
  if (redraw) {
    drawBrot();
  }
}
function synth(){
 //userStartAudio();
  mySong.loop();
  mySong.setVolume(0.1);
}

function drawBrot() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c = pixelToPoint(x, y);
      let result = calculatePoint(c);
      if (result.isIn) {
        set(x, y, color(0));
      } else if (result.i > 1) {
        set(
          x,
          y,
          color(50 + 150 - ((pow(result.i / 50, 0.5) * 400) % 255), 80, 200)
        );
      } else {
        set(x, y, color(50));
      }
    }
  }
  updatePixels();
}

function pixelToPoint(x, y) {
  let p = createVector(
    (x - width / 2) * (4 / width) * (16 / (9 * scale)) + cenX,
    (y - height / 2) * (4 / height) * (1 / scale) + cenY
  );
  return p;
}

function calculatePoint(c) {
  let z0 = createVector(0, 0);
  let i = 0;
  let bounds = 2;
  let isIn = true;

  while (i < 50 && isIn) {
    z0 = createVector(z0.x * z0.x - z0.y * z0.y + c.x, 2 * z0.x * z0.y + c.y);
    i++;
    if (z0.mag() > bounds) {
      isIn = false;
    }
  }

  return {
    i: i,
    isIn: isIn,
  };
}
