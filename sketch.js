const canvasW = 512;
const canvasH = 512;

// Helpers
const angleNoise = (a, seed) => noise(a + seed + frameCount * 0.01);

const noisyRadius = (r, a, seed) => map(angleNoise(a, seed), 0, 1, r * 0.95, r * 1.05);

const drawWavyCircle = (x, y, r, nPoints = 18, seed = 42) => {
  const step = 360 / nPoints;

  let vertexX;
  let vertexY;
  let radiusI;

  beginShape();
  for (let a = 0; a < 360; a += step) {
    radiusI = noisyRadius(r, a, seed);

    vertexX = cos(a) * radiusI;
    vertexY = sin(a) * radiusI;

    curveVertex(vertexX, vertexY);
    if (a === 0) {
      curveVertex(vertexX, vertexY);
    }
  }
  endShape(CLOSE);
};

const drawWavySlices = (x, y, r, nSlices = 18, seed = 42) => {
  const step = 360 / nSlices;

  let radiusI;
  let aNoiseI;
  for (let a = 0; a < 360; a += step) {
    push();
    aNoiseI = map(angleNoise(a, seed), 0, 1, -5, 5);
    rotate(a + aNoiseI);

    radiusI = noisyRadius(r, a, seed);
    line(0, 0, radiusI, 0);

    pop();
  }
};

const drawPizzaPie = (x, y, crustRadius = 150, nSlices = 8, seed = 42) => {
  const crustNPoints = nSlices * 2;

  push();
  translate(x, y);

  // Crust
  fill(199, 136, 103);
  drawWavyCircle(0, 0, crustRadius, crustNPoints, seed);

  // Cheese
  fill(221, 220, 130);
  drawWavyCircle(0, 0, crustRadius * 0.9, crustNPoints, seed);

  drawWavySlices(0, 0, crustRadius, nSlices, seed);

  pop();
};

// p5js functions that arent allowed to be arrows
function setup() {
  createCanvas(canvasW, canvasH);
  angleMode(DEGREES);
}

function draw() {
  background(100);
  translate(canvasW / 2, canvasH / 2);

  const pieX = 0;
  const pieY = 0;
  drawPizzaPie(pieX, pieY);
}

window.setup = setup;
window.draw = draw;
