let canvasW = 512;
let canvasH = 512;

function setup() {
  createCanvas(canvasW, canvasH)
  angleMode(DEGREES)
}

const crustDiameter = 300
const slices = 8

function draw() {
  background(0)
  translate(canvasW / 2, canvasH / 2)
  ellipse(0, 0, crustDiameter, crustDiameter)
  ellipse(0, 0, crustDiameter * .9, crustDiameter * .9)
  for (let a = 0; a < 180; a += 360 / slices) {
    push()
    const angleNoise = map(noise(a), 0, 1, -15, 15)
    rotate(a + angleNoise)
    line(-crustDiameter, 0, crustDiameter, 0)
    pop()
  }

}

