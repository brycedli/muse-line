let curvePoints = [];
let modifiedPoints = [];
let modifiedDensity = 100;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
}

function draw() {
    background(200);
    noFill();
    strokeWeight(1);


    for (let i = 0; i < curvePoints.length; i++) {
       
        ellipse(curvePoints[i].x, curvePoints[i].y, 10, 10);
    }
    if (curvePoints.length > 0) {
        for (let i = 1; i < curvePoints.length - 3; i++) {
            let p1 = curvePoints[i - 1];
            let p2 = curvePoints[i + 0];
            let p3 = curvePoints[i + 1];
            let p4 = curvePoints[i + 2];

            let m = Vec2.mag(Vec2.sub(p3, p2)) * 0.3;
            let c1 = Vec2.add(p2, Vec2.mult(Vec2.hat(Vec2.sub(p3, p1)), m));
            let c2 = Vec2.add(p3, Vec2.mult(Vec2.hat(Vec2.sub(p4, p2)), -m));
            
            stroke(255);
            strokeWeight(1);
            noFill();
            bezier(p2.x, p2.y, c1.x, c1.y, c2.x, c2.y, p3.x, p3.y);

          }
    }
   
    
    for (let i = 0; i < modifiedDensity; i++) {
        
    }

    beginShape();
    for (let i = 0; i < modifiedPoints.length; i++) {
        
        curveVertex(curvePoints[i].x, curvePoints[i].y);
        
    }
    endShape();

    
}

function mouseDragged() {
    // let mouseVector = createVector(mouseX, mouseY);
    let mouseVector = new Vec2(mouseX, mouseY);
    if (curvePoints.length == 0) {
        curvePoints.push(mouseVector);
    }
    else {
        let previousPoint = curvePoints[curvePoints.length - 1];
        // let distance = previousPoint.dist(mouseVector);
        let distance = Vec2.dist(previousPoint, mouseVector);
        if (distance > 40) {
            curvePoints.push(mouseVector);
        }
    }
}


class Vec2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    set(x, y) {
      this.x = x;
      this.y = y;
    }
    
    copy(v) {
      this.x = v.x;
      this.y = v.y;
    }
    
    
    clone(v) {
      return new Vec2(v.x, v.y);
    }

    static dist(v1, v2){
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    }
    
    static hat(v) {
      const mag = Math.sqrt(v.x * v.x + v.y * v.y);
      return new Vec2(v.x / mag, v.y / mag);
    }
  
    static dot(v1, v2) {
      return v1.x * v2.x + v1.y * v2.y;
    }
  
    static cross(v1, v2) {
      return new Vec2(v1.x * v2.y, v1.y * v2.x);
    }
    
    static crossProduct(v1, v2) {
      return v1.x * v2.y - v1.y * v2.x;
    }
    
    static mag(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    
    static mag2(v) {
      return v.x * v.x + v.y * v.y;
    }
    
    static add(...vs) {
      let x = 0, y = 0;
      for (let v of vs) {
        x += v.x;
        y += v.y;
      }
      return new Vec2(x, y);
    }
    
    static sub(v1, v2) {
      return new Vec2(v1.x - v2.x, v1.y - v2.y);
    }
  
    static mult(v, scalar) {
      return new Vec2(v.x * scalar, v.y * scalar);
    }
    
    static angleBetween(v1, v2) {
      return Math.acos(Vec2.dot(v1, v2) / (Vec2.mag(v1) * Vec2.mag(v2)));
    }
  }
  