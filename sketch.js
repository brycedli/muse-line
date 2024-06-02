let drawPolyline; // Declare object
let sourcePolyline;
let fallingPolyline;

let resampleSource;
let originalPoints = [];
let font;

var count = 240;
let canvas;

let clickedTime = -1;
let clickLength = 1000;
let drawingState = "draw" // draw, animate, logo

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
var pathData = "M106.033 257.757C86.2882 241.583 18.0351 212.992 2.71639 241.583C-7.99906 261.582 104.405 266.347 145.18 134.012C174.706 38.1844 199.326 55.2941 210.966 83.5493C219.379 103.973 234.28 176.979 209.823 168.479C193.909 162.947 212.497 125.857 254.623 90.7822C268.836 78.949 294.384 55.5966 301.26 27.5464C309.856 -7.51631 273.687 -8.79264 273.687 38.1844C273.687 65.4179 293.697 98.9488 309.856 145.926C316.404 164.964 326.167 194.77 310.137 223.802C310.107 223.855 310.175 223.914 310.214 223.867C317.427 214.951 327.529 198.976 335.983 185.499C353.543 157.5 370.561 142.181 377.513 117.076C383.641 94.9489 375.13 90.7822 369.343 102.183C360.444 119.714 341.26 197.284 367.776 214.349C402.158 236.476 423.98 166.947 426.363 155.032C429.256 140.564 419.269 145.896 414.363 162.691C407.725 185.415 415.874 211.148 426.363 214.349C442.515 219.28 444.62 184.807 445.133 186.854C445.134 186.857 445.136 186.862 445.136 186.864C465.733 238.093 522.068 233.334 532.657 205.924C546.664 169.67 499.601 151.236 480.113 135.373C454.496 114.523 468.454 91.2043 493.985 91.2043C519.516 91.2043 529.338 112.395 532.657 122.352C537.083 135.628 524.317 129.347 519.892 118.523C513.037 101.757 515.892 91.2043 550.699 91.2043C574.474 91.2043 589.677 95.7999 608.825 97.1616C627.973 98.5232 639.888 87.9568 629.42 83.5493C612.464 76.41 556.184 116.139 566.869 139.033C576.799 160.309 638.321 146.011 631.682 139.033C625.044 132.054 572.025 146.266 568.365 191.797C563.782 248.816 670.234 236.221 683 172.053"
// var pathData = "M628.21 1519.53C512.209 1424.5 111.209 1256.52 21.2089 1424.5C-41.7464 1542 618.649 1570 858.209 792.504C1031.68 229.498 1176.33 330.021 1244.71 496.026C1294.14 616.02 1412.37 1003.28 1244.71 974.998C1162.21 961.079 1253.71 744.589 1501.21 538.52C1584.71 468.998 1734.81 331.798 1775.21 166.998C1825.71 -39.0019 1613.21 -46.5006 1613.21 229.498C1613.21 389.5 1730.77 586.5 1825.71 862.498C1863.65 972.792 1919.95 1144.6 1831.21 1312.91C1830.64 1313.99 1832.12 1315.05 1832.87 1314.09C1874.04 1261.96 1923.82 1183.31 1979.21 1095C2082.38 930.5 2182.36 840.5 2223.21 693C2259.21 563 2209.21 538.52 2175.21 605.5C2122.92 708.5 2044.71 1108.5 2175.21 1240C2349.31 1415.43 2496.21 986 2510.21 915.998C2527.21 831 2468.53 862.325 2439.71 961C2400.71 1094.5 2442.21 1219 2487.71 1240C2542.95 1265.49 2607.42 1162.63 2592.89 1090.67C2592.66 1089.5 2594.64 1088.66 2595.26 1089.67C2700.01 1259.62 3010 1345.14 3130.21 1154C3242.77 974.998 2972.71 887.5 2828.21 792C2710.71 714.344 2786.21 556.64 2930.21 541C3096.71 522.916 3159.71 665.5 3179.21 723.998C3205.21 801.998 3130.21 765.094 3104.21 701.5C3063.94 603 3080.71 541 3285.21 541C3424.89 541 3514.21 568 3626.71 576C3739.21 584 3809.21 521.92 3747.71 496.026C3648.09 454.081 3317.43 687.498 3380.21 822C3438.55 947 3825.21 842.759 3747.71 822C3670.21 801.241 3439.21 822 3396.21 1109C3346.24 1442.53 3915.21 1382 4059.71 974.998"
// var pathData = "M1 251C84 181 104.5 178.5 107 93C109.5 7.5 187 -13.5 197.5 10C208 33.5 161 69.5 213 124C254.6 167.6 304.667 168.167 324.5 163C307.167 145.667 295.3 107.4 386.5 93C477.7 78.6 540.167 266.333 560 362C555 372.5 569.8 353.1 669 191.5C768.2 29.9 926 34.5 992.5 57L1142.5 191.5";
var bezierPoints;





function preload() {
    font = loadFont('https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf')
}
let minX = Infinity, minY = Infinity;
let maxX = -Infinity, maxY = -Infinity;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
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
}


function draw() {
    // background(0);
    clear();
    textFont(font)

    let lerpPolyline = new ofPolyline();
    // print(sourcePolyline.bezierResamples);
    if (drawingState == "animate" && clickedTime != -1) {
        for (let i = 0; i < drawPolyline.bezierResamples.length; i++) {
            var drawPoint = drawPolyline.bezierResamples[i];
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

    lerpPolyline.calculateApprox(1);
    lerpPolyline.calculateBeziers(lerpPolyline.approx);
    strokeWeight(4);
    stroke("#FF4F99");
    if (drawingState == "animate"){
        lerpPolyline.displayCalculatedBeziers();
    }
    if (drawingState == "draw") {
        drawPolyline.displayCalculatedBeziers();
        
    }
     if (drawingState == "logo") {
        sourcePolyline.displayCalculatedBeziers();
    }

    print(drawingState, clickedTime, clickLength, millis());

    // let time = max(0, millis() - clickedTime - clickLength) / 5000
    // if (fallingPolyline && showDrawing) {

    //     // push()
    //     // let d = time * time;
    //     // translate(0, d);
    //     let c = color("#FF4F99")
    //     // c.setAlpha(255 - time * 255);
    //     stroke(c);
    //     fallingPolyline.displayCalculatedBeziers();
    //     if (time > 1) {
    //         fallingPolyline = null;
    //     }
    //     // pop()
    //     // if (d > height){
    //     //     fallingPolyline = null;
    //     // }
    // }

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

function mouseReleased(event) {
    
    drawPolyline.calculateApprox(5);
    drawPolyline.calculateBeziers(drawPolyline.approx);
    drawPolyline.recalculateBezierLengths();
    drawPolyline.calculateBezierResamples(count);
    clickedTime = millis();
    drawingState = "animate";
}

function keyPressed() {

    if (key == 'r') {
        drawPolyline.clear();
    }
}




