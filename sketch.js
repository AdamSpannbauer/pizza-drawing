const canvasW = 512;
const canvasH = 512;

function setup() {
  createCanvas(canvasW, canvasH);
  angleMode(DEGREES);
}

const crustDiameter = 300;
const crustRadius = crustDiameter / 2;
const slices = 8;
const crustNPoints = 18;

function draw() {
  background(100);
  translate(canvasW / 2, canvasH / 2);

  fill(199, 136, 103);
  wavyCircle(0, 0, crustRadius, crustNPoints);

  fill(221, 220, 130);
  wavyCircle(0, 0, crustRadius * 0.9, crustNPoints);
  for (let a = 0; a < 180; a += 360 / slices) {
    push();
    const angleNoise = map(noise(a), 0, 1, -15, 15);
    rotate(a + angleNoise);
    line(-crustRadius * 0.95, 0, crustRadius * 0.95, 0);
    pop();
  }
}

const wavyCircle = (x, y, r, nPoints) => {
  const step = 360 / nPoints;
  const minR = r * 0.95;
  const maxR = r * 1.05;

  let vertexX = 0;
  let vertexY = 0;
  let radiusI = r;

  beginShape();
  for (let a = 0; a < 360; a += step) {
    radiusI = map(noise(a + frameCount * 0.01), 0, 1, minR, maxR);
    vertexX = cos(a) * radiusI;
    vertexY = sin(a) * radiusI;
    curveVertex(vertexX, vertexY);
  }
  endShape(CLOSE);
};
