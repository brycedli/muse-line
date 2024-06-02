let drawPolyline; // Declare object
let sourcePolyline;
let fallingPolyline;

let resampleSource;
let originalPoints = [];
let font;

var count = 200;
let canvas;
let minPoints = 2;
let clickedTime = -1;
let clickLength = 1000;
let drawingState = "draw" // draw, animate, logo

var pathData = "M106.033 257.757C86.2882 241.583 18.0351 212.992 2.71639 241.583C-7.99906 261.582 104.405 266.347 145.18 134.012C174.706 38.1844 199.326 55.2941 210.966 83.5493C219.379 103.973 234.28 176.979 209.823 168.479C193.909 162.947 212.497 125.857 254.623 90.7822C268.836 78.949 294.384 55.5966 301.26 27.5464C309.856 -7.51631 273.687 -8.79264 273.687 38.1844C273.687 65.4179 293.697 98.9488 309.856 145.926C316.404 164.964 326.167 194.77 310.137 223.802C310.107 223.855 310.175 223.914 310.214 223.867C317.427 214.951 327.529 198.976 335.983 185.499C353.543 157.5 370.561 142.181 377.513 117.076C383.641 94.9489 375.13 90.7822 369.343 102.183C360.444 119.714 341.26 197.284 367.776 214.349C402.158 236.476 423.98 166.947 426.363 155.032C429.256 140.564 419.269 145.896 414.363 162.691C407.725 185.415 415.874 211.148 426.363 214.349C442.515 219.28 444.62 184.807 445.133 186.854C445.134 186.857 445.136 186.862 445.136 186.864C465.733 238.093 522.068 233.334 532.657 205.924C546.664 169.67 499.601 151.236 480.113 135.373C454.496 114.523 468.454 91.2043 493.985 91.2043C519.516 91.2043 529.338 112.395 532.657 122.352C537.083 135.628 524.317 129.347 519.892 118.523C513.037 101.757 515.892 91.2043 550.699 91.2043C574.474 91.2043 589.677 95.7999 608.825 97.1616C627.973 98.5232 639.888 87.9568 629.42 83.5493C612.464 76.41 556.184 116.139 566.869 139.033C576.799 160.309 638.321 146.011 631.682 139.033C625.044 132.054 572.025 146.266 568.365 191.797C563.782 248.816 670.234 236.221 683 172.053"
var bezierPoints;

function preload() {
    font = loadFont('https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf')
}
let minX = Infinity, minY = Infinity;
let maxX = -Infinity, maxY = -Infinity;


function setup() {
    let parent = document.getElementById("sketch-holder").getBoundingClientRect();
    canvas = createCanvas(parent.width, parent.height);
    canvas.parent('sketch-holder');

    bezierPoints = parsePathData(pathData);
    // console.log(bezierPoints);
    drawPolyline = new ofPolyline();
    sourcePolyline = new ofPolyline();

    let coords = [];
    for (let i = 0; i < bezierPoints.length; i++) {

        coords = coords.concat(bezierPoints[i]);
    }

    for (const coord of coords) {
        if (coord.x < minX) minX = coord.x;
        if (coord.x > maxX) maxX = coord.x;
        if (coord.y < minY) minY = coord.y;
        if (coord.y > maxY) maxY = coord.y;
    }

    const targetBox = {
        topLeft: { x: width * 0.25, y: height * 0.25 },
        bottomRight: { x: width * 0.75, y: height * 0.75 }
    };

    const boundingBox = {
        topLeft: { x: minX, y: minY },
        bottomRight: { x: maxX, y: maxY }
    };

    const boundingBoxWidth = boundingBox.bottomRight.x - boundingBox.topLeft.x;
    const boundingBoxHeight = boundingBox.bottomRight.y - boundingBox.topLeft.y;

    const targetBoxWidth = targetBox.bottomRight.x - targetBox.topLeft.x;
    const targetBoxHeight = targetBox.bottomRight.y - targetBox.topLeft.y;

    const scale = Math.min(targetBoxWidth / boundingBoxWidth, targetBoxHeight / boundingBoxHeight);

    const scaledWidth = boundingBoxWidth * scale;
    const scaledHeight = boundingBoxHeight * scale;

    const offsetX = (targetBoxWidth - scaledWidth) / 2 + targetBox.topLeft.x - boundingBox.topLeft.x * scale;
    const offsetY = (targetBoxHeight - scaledHeight) / 2 + targetBox.topLeft.y - boundingBox.topLeft.y * scale;

    const transform = {
        scale: scale,
        // offset: {x: offsetX, y: offsetY}
        offset: createVector(offsetX - width/24, offsetY)
    };



    let beziers = [];
    for (let i = 0; i < bezierPoints.length; i++) {

        let p0 = bezierPoints[i][0].mult(transform.scale).add(transform.offset);
        let p1 = bezierPoints[i][1].mult(transform.scale).add(transform.offset);
        let p2 = bezierPoints[i][2].mult(transform.scale).add(transform.offset);
        let p3 = bezierPoints[i][3].mult(transform.scale).add(transform.offset);

        let quadBezier = new BezierQuad(p0, p1, p2, p3);
        beziers.push(quadBezier);
    }
    sourcePolyline.beziers = beziers;
    sourcePolyline.recalculateBezierLengths();
    sourcePolyline.calculateBezierResamples(count);
}


function draw() {
    // background(0);
    clear();
    textFont(font)

    let lerpPolyline = new ofPolyline();
    // print(sourcePolyline.bezierResamples);
    if (drawingState == "animate" && clickedTime != -1 && drawPolyline.points.length > minPoints) {
        for (let i = 0; i < drawPolyline.bezierResamples.length; i++) {
            var drawPoint = drawPolyline.bezierResamples[i];
        if (drawPoint.x == 0 && drawPoint.y == 0) {
            continue
        }
            var sourcePoint = sourcePolyline.bezierResamples[i];

            let t = constrain((millis() - clickedTime) / clickLength, 0, 1)
            let easeOut = sin(PI / 2 * t);
            let finalPoint = p5.Vector.lerp(drawPoint, sourcePoint, easeOut);
            lerpPolyline.add(finalPoint.x, finalPoint.y, 1);
        }
        if (millis() - clickedTime > clickLength) {
            drawingState = "logo";
        }
    }
    
    noFill();

    
    strokeWeight(4);
    stroke("#FF4F99");
    if (drawingState == "animate"){
        lerpPolyline.calculateApprox(5);
    lerpPolyline.calculateBeziers(lerpPolyline.approx);
        lerpPolyline.displayCalculatedBeziers();
    }
    if (drawingState == "draw") {
        drawPolyline.displayCalculatedBeziers();
        
    }
     if (drawingState == "logo") {
        let tagline = document.getElementById("tagline");
        tagline.className = "";
        sourcePolyline.displayCalculatedBeziers();
    }



}



function mousePressed() {
    drawPolyline.clear();
    originalPoints.push([mouseX, mouseY]);
    let title = document.getElementById("title");
    title.className += " hidden"
    drawingState = "draw"
}

function mouseDragged() {
    drawPolyline.calculateApprox(5);
    drawPolyline.calculateBeziers(drawPolyline.approx);
    drawPolyline.recalculateBezierLengths();
    drawPolyline.calculateBezierResamples(count/10);
    drawPolyline.add(mouseX, mouseY);
    originalPoints.push([mouseX, mouseY]);

}

function mouseReleased() {
    if (drawPolyline.points.length > minPoints){
        print("approx length: " + width/1000);
        drawPolyline.calculateApprox(width/1000);
        drawPolyline.calculateBeziers(drawPolyline.approx);
        drawPolyline.recalculateBezierLengths();
        drawPolyline.calculateBezierResamples(count);
        clickedTime = millis();
        drawingState = "animate";
    }
    rotateSVG();
}

function keyPressed() {

    if (key == 'r') {
        drawPolyline.clear();
    }
}



function parsePathData(d) {
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
                createVector(currentPos[0], currentPos[1]),       // p1: start point
                createVector(x1, y1),         // p2: first control point
                createVector(x2, y2),         // p3: second control point
                createVector(x, y)         // p4: end point
            ]);
            currentPos = [x, y];
        } else if (type === 'L') {
            // Line To command, updating current position
            currentPos = [args[0], args[1]];
        }
    });

    return bezierCurves;
}