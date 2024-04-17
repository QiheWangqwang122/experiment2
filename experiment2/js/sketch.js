
let seed = 0;


const grassColor = "#46733E"; 
const skyColor = "#7EC8E3"; 
const mountainColor = "#7E8C8D"; 
const snowColor = "#E8F8F9"; 
const treeColor = "#2D472C"; 

function setup() {
  createCanvas(400, 200);
  createButton("reimagine").mousePressed(() => seed++);

}

function drawMountain(mountainBaseY, peakY) {
  beginShape();
  vertex(0, height);
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(x * 0.05, seed), 0, 1, peakY, mountainBaseY);
    vertex(x, y);


    if (y < peakY + (mountainBaseY - peakY) / 3) {
      let lerpAmt = map(y, peakY, peakY + (mountainBaseY - peakY) / 3, 0, 1);
      fill(lerpColor(color(snowColor), color(mountainColor), lerpAmt));
    } else {
      fill(mountainColor);
    }

    if (x % 20 === 0 && y > peakY + (mountainBaseY - peakY) / 6) {
      let treeSize = random(5, 15);
      fill(treeColor);
      triangle(
        
        x - treeSize / 2, y,
        x + treeSize / 2, y,
        x, y - treeSize
      );
    }
  }
  vertex(width, height);
  endShape(CLOSE);
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  background(skyColor);


  fill(grassColor);
  rect(0, height / 2, width, height / 2);

  // Left Mountain
  drawMountain(height / 2, height / 4);


  push(); 
  translate(width, 0); 
  scale(-1, 1); 
  drawMountain(height / 2, height / 4);
  pop(); 
}
