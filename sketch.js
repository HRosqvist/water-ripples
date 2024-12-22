let maxWidth = 800
let maxHeight = 1200

let current
let previous

let columns
let rows

let damping = 0.99

function setup() {
  let canvasWidth = floor(windowWidth * 0.9)
  let canvasHeight = floor(windowHeight * 0.8)

  if (canvasWidth > 800) {
    canvasWidth = maxWidth
  }

  if (canvasHeight > 1200) {
    canvasHeight = maxHeight
  }

  createCanvas(canvasWidth, canvasHeight);

  columns = width
  rows = height

  current = new Array(columns).fill(0).map(n => new Array(rows).fill(0))
  previous = new Array(columns).fill(0).map(n => new Array(rows).fill(0))
}

function draw() {
  background(0);
  loadPixels()

  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      current[i][j] = (previous[i - 1][j] + previous[i + 1][j] + previous[i][j + 1] + previous[i][j - 1]) / 2 - current[i][j]

      current[i][j] = current[i][j] * damping

      let index = (i + j * columns) * 4
      pixels[index + 0] = current[i][j]
      pixels[index + 1] = current[i][j]
      pixels[index + 2] = current[i][j]
    }
  }

  updatePixels()

  let temp = previous
  previous = current
  current = temp
}

function mouseDragged() {
  let col = floor(mouseX)
  let row = floor(mouseY)
  if (col > 0 && col < width && row > 0 && row < height) {
    previous[floor(mouseX)][floor(mouseY)] = 2500
  }
}
