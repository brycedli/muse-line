let drawPolyline; // Declare object
let sourcePolyline;

let resampleSource;
let originalPoints = [];
let font;

var count = 200;


function parsePathData(d, offset, scale) {
    const commands = d.match(/[A-Za-z][^A-Za-z]*/g);
    let currentPos = [0, 0];
    const bezierCurves = [];
  
    commands.forEach(command => {
      const type = command[0];
      const args = command.slice(1).trim().split(/[\s,]+/).map(Number);
  
      if (type === 'M') {
        // Move To command
        currentPos = [args[0], args[1]];
      } else if (type === 'C') {
        // Cubic Bezier Curve command
        const [x1, y1, x2, y2, x, y] = args;
        // bezierCurves.push([
        //   currentPos,       // p1: start point
        //   [x1, y1],         // p2: first control point
        //   [x2, y2],         // p3: second control point
        //   [x, y]            // p4: end point
        // ]);
        bezierCurves.push([
            createVector(currentPos[0], currentPos[1]).add(offset).mult(scale),       // p1: start point
            createVector(x1, y1).add(offset).mult(scale),         // p2: first control point
            createVector(x2, y2).add(offset).mult(scale),         // p3: second control point
            createVector(x, y).add(offset).mult(scale)          // p4: end point
          ]);
        currentPos = [x, y];
      } else if (type === 'L') {
        // Line To command, updating current position
        currentPos = [args[0], args[1]];
      }
    });
  
    return bezierCurves;
  }
var pathData = "M628.21 1519.53C512.209 1424.5 111.209 1256.52 21.2089 1424.5C-41.7464 1542 618.649 1570 858.209 792.504C1031.68 229.498 1176.33 330.021 1244.71 496.026C1294.14 616.02 1412.37 1003.28 1244.71 974.998C1162.21 961.079 1253.71 744.589 1501.21 538.52C1584.71 468.998 1734.81 331.798 1775.21 166.998C1825.71 -39.0019 1613.21 -46.5006 1613.21 229.498C1613.21 389.5 1730.77 586.5 1825.71 862.498C1863.65 972.792 1919.95 1144.6 1831.21 1312.91C1830.64 1313.99 1832.12 1315.05 1832.87 1314.09C1874.04 1261.96 1923.82 1183.31 1979.21 1095C2082.38 930.5 2182.36 840.5 2223.21 693C2259.21 563 2209.21 538.52 2175.21 605.5C2122.92 708.5 2044.71 1108.5 2175.21 1240C2349.31 1415.43 2496.21 986 2510.21 915.998C2527.21 831 2468.53 862.325 2439.71 961C2400.71 1094.5 2442.21 1219 2487.71 1240C2542.95 1265.49 2607.42 1162.63 2592.89 1090.67C2592.66 1089.5 2594.64 1088.66 2595.26 1089.67C2700.01 1259.62 3010 1345.14 3130.21 1154C3242.77 974.998 2972.71 887.5 2828.21 792C2710.71 714.344 2786.21 556.64 2930.21 541C3096.71 522.916 3159.71 665.5 3179.21 723.998C3205.21 801.998 3130.21 765.094 3104.21 701.5C3063.94 603 3080.71 541 3285.21 541C3424.89 541 3514.21 568 3626.71 576C3739.21 584 3809.21 521.92 3747.71 496.026C3648.09 454.081 3317.43 687.498 3380.21 822C3438.55 947 3825.21 842.759 3747.71 822C3670.21 801.241 3439.21 822 3396.21 1109C3346.24 1442.53 3915.21 1382 4059.71 974.998"
// var pathData = "M1 251C84 181 104.5 178.5 107 93C109.5 7.5 187 -13.5 197.5 10C208 33.5 161 69.5 213 124C254.6 167.6 304.667 168.167 324.5 163C307.167 145.667 295.3 107.4 386.5 93C477.7 78.6 540.167 266.333 560 362C555 372.5 569.8 353.1 669 191.5C768.2 29.9 926 34.5 992.5 57L1142.5 191.5";
var bezierPoints;





function preload() {
    font = loadFont('https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf')
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    bezierPoints = parsePathData(pathData, createVector(width / 2, height / 2), 0.2);
    // console.log(bezierPoints);
    drawPolyline = new ofPolyline();
    sourcePolyline = new ofPolyline();

    // for (var i = 0; i < 10; i++) {
    //     sourcePolyline.add(width / 10 * i, random(height));

    // }
    let beziers = [];
    for (let i = 0; i < bezierPoints.length; i++) {
        let p0 = bezierPoints[i][0];
        let p1 = bezierPoints[i][1];
        let p2 = bezierPoints[i][2];
        let p3 = bezierPoints[i][3];
        
        let quadBezier = new BezierQuad(p0, p1, p2, p3);
        beziers.push(quadBezier);
    }
    // print(beziers);
    sourcePolyline.beziers = beziers;
    // sourcePolyline.calculateApprox(5);
    // sourcePolyline.calculateBeziers(sourcePolyline.approx);
    // sourcePolyline.recalculateBezierLengths();
    // sourcePolyline.calculateBezierResamples(count);
    // sourcePolyline.displayCalculatedBeziers();
    
    // resampleSource = sourcePolyline.getResampledByCount(count);
    // resampleSource.calculateApprox(5);
    // resampleSource.calculateBeziers(resampleSource.approx);
    sourcePolyline.recalculateBezierLengths();
    sourcePolyline.calculateBezierResamples(count);
    print(sourcePolyline);
}

function draw() {
    background(220);
    textFont(font)




    // var resampleDraw = drawPolyline.getResampledByCount(count);
    // stroke(0);


    let lerpPolyline = new ofPolyline();
    // print(sourcePolyline.bezierResamples);
    for (let i = 0; i < drawPolyline.bezierResamples.length; i++) {
        var drawPoint = drawPolyline.bezierResamples[i];
        var sourcePoint = sourcePolyline.bezierResamples[i];
        
        let t = sin(millis() / 500) / 2 + 0.5;
        let finalPoint = p5.Vector.lerp(drawPoint, sourcePoint, t);
        lerpPolyline.add(finalPoint.x, finalPoint.y, 1);
    }
    noFill();

    lerpPolyline.calculateApprox(5);
    lerpPolyline.calculateBeziers(lerpPolyline.approx);
    strokeWeight(10);
    stroke(0, 128);
    drawPolyline.displayCalculatedBeziers();
    sourcePolyline.displayCalculatedBeziers();
    strokeWeight(20);
    stroke(0);
    lerpPolyline.displayCalculatedBeziers();
    noFill();
    stroke("blue");


    stroke(0, 255, 0);
    fill(0);
    noStroke();
    var L = drawPolyline.getPerimeter();
    text(nf(L, 0, 2), 30, 30);

    var Lb = drawPolyline.getBezierPerimeter();
    text(nf(Lb, 0, 2), 30, 50);

    // for (let i = 0; i < drawPolyline.beziers.length; i++) {
    //     let p1 = drawPolyline.beziers[i].p1;
    //     let p2 = drawPolyline.beziers[i].p2;
    //     let p3 = drawPolyline.beziers[i].p3;
    //     let p4 = drawPolyline.beziers[i].p4;
    //     fill(255);
    //     circle(p1.x, p1.y, 10);
    //     fill(255 * 3/4);
    //     circle(p2.x, p2.y, 10);
    //     fill(255 * 2/4);
    //     circle(p3.x, p3.y, 10);
    //     fill(255 * 1/4);
    //     circle(p4.x, p4.y, 10);
    // }



}

function mousePressed() {
    print(drawPolyline)
    drawPolyline.calculateApprox(5);
    drawPolyline.calculateBeziers(drawPolyline.approx);
    drawPolyline.recalculateBezierLengths();
    drawPolyline.calculateBezierResamples(count);
    drawPolyline.add(mouseX, mouseY);
    originalPoints.push([mouseX, mouseY]);
}

function mouseDragged() {
    drawPolyline.calculateApprox(5);
    drawPolyline.calculateBeziers(drawPolyline.approx);
    drawPolyline.recalculateBezierLengths();
    drawPolyline.calculateBezierResamples(count);
    drawPolyline.add(mouseX, mouseY);
    originalPoints.push([mouseX, mouseY]);

}

function keyPressed() {

    if (key == 'r') {
        drawPolyline.clear();
    }
}

function mouseReleased() {

}


