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
let mouseDownTime = -1;
// var pathData;
let current = 0;
// var pathData = "M313.325 1188C221.123 1082.92 1.99936 1051.89 2 1160.48C2.00046 1238.53 313.325 1189.28 313.325 1042.39C313.325 895.5 2 762.681 2 907.287C2 1051.89 313.325 960.831 313.325 825.231C313.325 689.631 1.99946 541.519 2 672.113C2.00063 825.231 313.325 717.653 313.325 572.546C313.325 427.439 2 273.821 2 427.935C2 582.049 313.325 418.932 313.325 319.359C313.325 219.785 2.00018 291.152 2 169.743C1.99981 41.1537 475.331 -281.587 712 572.546M712 572.546C868.945 1138.96 539.912 952.318 712 572.546ZM712 572.546C1073.65 -225.551 1422 41.1538 1422 169.743C1422 291.152 1110.68 219.785 1110.68 319.359C1110.68 418.932 1422 582.049 1422 427.935C1422 273.821 1110.68 427.439 1110.68 572.546C1110.68 717.653 1422 825.231 1422 672.113C1422 541.519 1110.68 689.631 1110.68 825.231C1110.68 960.831 1422 1051.89 1422 907.288C1422 780.707 1110.68 932.624 1110.68 1042.39C1110.68 1129.5 1271.78 1193.06 1422 1160.48C1604 1121 1711 894.713 1723 639C1738 319.359 1558 811 1640.5 1006.5C1723 1202 2036.64 1282.56 2141.5 844C2221 511.5 2065 801.5 2073 1006.5C2075.77 1077.5 2110.2 1358.49 2325 1204C2593.5 1010.89 2256.5 700.758 2496 559C2735.5 417.242 2837.63 551.592 2900 591.454C2965 633 3099 639 2980 559C2853.25 473.793 2644.9 507.832 2595 591.454C2535 692 2615.5 772.495 2917 811.685C3143.5 841.126 3214 1101.13 3006 1146.93C2881 1174.45 2684.5 1120.5 2672 1059C2660.55 1002.66 2739.5 1050.41 2811 1085.95C2882.5 1121.5 3057 1226.5 3442.5 1184.5C3787.35 1146.93 3876.94 1051.96 3942 1006.5C4056.5 926.5 4102.38 948.5 4090.5 977C4060.57 1048.82 3625 1193 3417 1067.48C3249.09 966.145 3305.72 708.926 3599 651.5C3742 623.5 3753.5 699.5 3625 734C3471.5 775.212 3150.21 665.955 3274.5 495C3405 315.5 3733.5 363.5 3763.5 426.5";
// var pathData = "M106.033 257.757C86.2882 241.583 18.0351 212.992 2.71639 241.583C-7.99906 261.582 104.405 266.347 145.18 134.012C174.706 38.1844 199.326 55.2941 210.966 83.5493C219.379 103.973 234.28 176.979 209.823 168.479C193.909 162.947 212.497 125.857 254.623 90.7822C268.836 78.949 294.384 55.5966 301.26 27.5464C309.856 -7.51631 273.687 -8.79264 273.687 38.1844C273.687 65.4179 293.697 98.9488 309.856 145.926C316.404 164.964 326.167 194.77 310.137 223.802C310.107 223.855 310.175 223.914 310.214 223.867C317.427 214.951 327.529 198.976 335.983 185.499C353.543 157.5 370.561 142.181 377.513 117.076C383.641 94.9489 375.13 90.7822 369.343 102.183C360.444 119.714 341.26 197.284 367.776 214.349C402.158 236.476 423.98 166.947 426.363 155.032C429.256 140.564 419.269 145.896 414.363 162.691C407.725 185.415 415.874 211.148 426.363 214.349C442.515 219.28 444.62 184.807 445.133 186.854C445.134 186.857 445.136 186.862 445.136 186.864C465.733 238.093 522.068 233.334 532.657 205.924C546.664 169.67 499.601 151.236 480.113 135.373C454.496 114.523 468.454 91.2043 493.985 91.2043C519.516 91.2043 529.338 112.395 532.657 122.352C537.083 135.628 524.317 129.347 519.892 118.523C513.037 101.757 515.892 91.2043 550.699 91.2043C574.474 91.2043 589.677 95.7999 608.825 97.1616C627.973 98.5232 639.888 87.9568 629.42 83.5493C612.464 76.41 556.184 116.139 566.869 139.033C576.799 160.309 638.321 146.011 631.682 139.033C625.044 132.054 572.025 146.266 568.365 191.797C563.782 248.816 670.234 236.221 683 172.053"
// var bezierPoints;
var bezierPoints;





function preload() {
    font = loadFont('https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf')
}



function setup() {
    let parent = document.getElementById("sketch-holder").getBoundingClientRect();
    canvas = createCanvas(parent.width, parent.height);
    canvas.parent('sketch-holder');
    regenerateSourceCurve(current);

}

function regenerateSourceCurve (index) {
    let minX = Infinity, minY = Infinity;
let maxX = -Infinity, maxY = -Infinity;
    let pathData = [
        {
            offset: createVector(0, -height/24 ),
            data: "M313.325 1188C221.123 1082.92 1.99936 1051.89 2 1160.48C2.00046 1238.53 313.325 1189.28 313.325 1042.39C313.325 895.5 2 762.681 2 907.287C2 1051.89 313.325 960.831 313.325 825.231C313.325 689.631 1.99946 541.519 2 672.113C2.00063 825.231 313.325 717.653 313.325 572.546C313.325 427.439 2 273.821 2 427.935C2 582.049 313.325 418.932 313.325 319.359C313.325 219.785 2.00018 291.152 2 169.743C1.99981 41.1537 475.331 -281.587 712 572.546M712 572.546C868.945 1138.96 539.912 952.318 712 572.546ZM712 572.546C1073.65 -225.551 1422 41.1538 1422 169.743C1422 291.152 1110.68 219.785 1110.68 319.359C1110.68 418.932 1422 582.049 1422 427.935C1422 273.821 1110.68 427.439 1110.68 572.546C1110.68 717.653 1422 825.231 1422 672.113C1422 541.519 1110.68 689.631 1110.68 825.231C1110.68 960.831 1422 1051.89 1422 907.288C1422 780.707 1110.68 932.624 1110.68 1042.39C1110.68 1129.5 1271.78 1193.06 1422 1160.48C1604 1121 1711 894.713 1723 639C1738 319.359 1558 811 1640.5 1006.5C1723 1202 2036.64 1282.56 2141.5 844C2221 511.5 2065 801.5 2073 1006.5C2075.77 1077.5 2110.2 1358.49 2325 1204C2593.5 1010.89 2256.5 700.758 2496 559C2735.5 417.242 2837.63 551.592 2900 591.454C2965 633 3099 639 2980 559C2853.25 473.793 2644.9 507.832 2595 591.454C2535 692 2615.5 772.495 2917 811.685C3143.5 841.126 3214 1101.13 3006 1146.93C2881 1174.45 2684.5 1120.5 2672 1059C2660.55 1002.66 2739.5 1050.41 2811 1085.95C2882.5 1121.5 3057 1226.5 3442.5 1184.5C3787.35 1146.93 3876.94 1051.96 3942 1006.5C4056.5 926.5 4102.38 948.5 4090.5 977C4060.57 1048.82 3625 1193 3417 1067.48C3249.09 966.145 3305.72 708.926 3599 651.5C3742 623.5 3753.5 699.5 3625 734C3471.5 775.212 3150.21 665.955 3274.5 495C3405 315.5 3733.5 363.5 3763.5 426.5"

        },
        {
            offset: createVector(0, -height/24 ),
            data: "M2 1032.02C100.333 788.021 352.5 251.221 574.5 56.0207C852 -187.979 725.5 695.521 650 931.021C574.5 1166.52 448 1216.52 448 1099.02C448 981.519 1014.5 -2.98102 1123.5 2.01898C1232.5 7.01898 1129 797.522 1020 1032.02C911 1266.52 940.548 957.765 968 877.52C1020 725.52 1123 587.52 1242.5 629.02C1362 670.52 1299.5 1035.52 1242.5 1099.02C1185.5 1162.52 1225.92 914.246 1341 774.02C1416.5 682.02 1489 629.02 1517.5 629.02C1585 629.02 1434.5 751.52 1434.5 960.52C1434.5 1071.21 1532.5 1186.52 1698.5 1032.02C1864.5 877.52 1880 724.02 1880 670.52C1880 560.52 1782 683.02 1759.5 841.52C1737.64 995.495 1759.5 1071.52 1838.5 1099.02C1933.02 1131.92 2179.5 841.52 2242.5 670.52C2282.53 561.861 2340.78 510.02 2408.5 510.02C2636.5 510.02 2384.1 533.5 2377.5 610.5C2370.9 687.5 2448.09 706.857 2540.5 903.52C2618.5 1069.52 2313 1222.52 2173.5 1054.02C2034 885.52 2370.82 1120.02 2495.5 1132.02C2760.5 1157.52 2954 965.52 3011 774.02C3073.06 565.52 2949.48 417.52 2796.5 650.02C2708 784.52 2594.5 1504.52 3413.5 877.52"

        },
        {
            offset: createVector(- width / 24, 0),
            data: "M106.033 257.757C86.2882 241.583 18.0351 212.992 2.71639 241.583C-7.99906 261.582 104.405 266.347 145.18 134.012C174.706 38.1844 199.326 55.2941 210.966 83.5493C219.379 103.973 234.28 176.979 209.823 168.479C193.909 162.947 212.497 125.857 254.623 90.7822C268.836 78.949 294.384 55.5966 301.26 27.5464C309.856 -7.51631 273.687 -8.79264 273.687 38.1844C273.687 65.4179 293.697 98.9488 309.856 145.926C316.404 164.964 326.167 194.77 310.137 223.802C310.107 223.855 310.175 223.914 310.214 223.867C317.427 214.951 327.529 198.976 335.983 185.499C353.543 157.5 370.561 142.181 377.513 117.076C383.641 94.9489 375.13 90.7822 369.343 102.183C360.444 119.714 341.26 197.284 367.776 214.349C402.158 236.476 423.98 166.947 426.363 155.032C429.256 140.564 419.269 145.896 414.363 162.691C407.725 185.415 415.874 211.148 426.363 214.349C442.515 219.28 444.62 184.807 445.133 186.854C445.134 186.857 445.136 186.862 445.136 186.864C465.733 238.093 522.068 233.334 532.657 205.924C546.664 169.67 499.601 151.236 480.113 135.373C454.496 114.523 468.454 91.2043 493.985 91.2043C519.516 91.2043 529.338 112.395 532.657 122.352C537.083 135.628 524.317 129.347 519.892 118.523C513.037 101.757 515.892 91.2043 550.699 91.2043C574.474 91.2043 589.677 95.7999 608.825 97.1616C627.973 98.5232 639.888 87.9568 629.42 83.5493C612.464 76.41 556.184 116.139 566.869 139.033C576.799 160.309 638.321 146.011 631.682 139.033C625.044 132.054 572.025 146.266 568.365 191.797C563.782 248.816 670.234 236.221 683 172.053"
        }
    ]
    let path = pathData[index%pathData.length];
    bezierPoints = parsePathData(path.data);
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

    let targetBox = {
        topLeft: { x: width * 0.25, y: height * 0.25 },
        bottomRight: { x: width * 0.75, y: height * 0.75 }
    };

    let boundingBox = {
        topLeft: { x: minX, y: minY },
        bottomRight: { x: maxX, y: maxY }
    };

    let boundingBoxWidth = boundingBox.bottomRight.x - boundingBox.topLeft.x;
    let boundingBoxHeight = boundingBox.bottomRight.y - boundingBox.topLeft.y;

    let targetBoxWidth = targetBox.bottomRight.x - targetBox.topLeft.x;
    let targetBoxHeight = targetBox.bottomRight.y - targetBox.topLeft.y;

    let scale = Math.min(targetBoxWidth / boundingBoxWidth, targetBoxHeight / boundingBoxHeight);

    let scaledWidth = boundingBoxWidth * scale;
    let scaledHeight = boundingBoxHeight * scale;

    let offsetX = (targetBoxWidth - scaledWidth) / 2 + targetBox.topLeft.x - boundingBox.topLeft.x * scale;
    let offsetY = (targetBoxHeight - scaledHeight) / 2 + targetBox.topLeft.y - boundingBox.topLeft.y * scale;

    let transform = {
        scale: scale,
        // offset: {x: offsetX, y: offsetY}
        offset: createVector(offsetX + path.offset.x, offsetY + path.offset.y)
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
    if (windowWidth < 600) {
        strokeWeight(2);
    }else{
        strokeWeight(4);
    }

    
    stroke("#FF4F99");
    if (drawingState == "animate") {
        lerpPolyline.calculateApprox(5);
        lerpPolyline.calculateBeziers(lerpPolyline.approx);
        lerpPolyline.displayCalculatedBeziers();
    }
    if (drawingState == "draw") {
        drawPolyline.displayCalculatedBeziers();
        if (mouseDownTime != -1 && millis() - mouseDownTime > 5000) {
            // let title = document.getElementById("title");
            let animation = document.getElementById("gesture");
            // title.className = ""
            animation.className = ""
        }
    }
    if (drawingState == "logo") {
        let tagline = document.getElementById("tagline");
        tagline.className = "";
        sourcePolyline.displayCalculatedBeziers();
    }



}



function mousePressed() {
    let parent = document.getElementById("sketch-holder").getBoundingClientRect();
    if (mouseX < 0 || mouseX > parent.width || mouseY < 0 || mouseY > parent.height) {
        return
    }
    current = current + 1;
    regenerateSourceCurve(current);

    drawPolyline.clear();
    originalPoints.push([mouseX, mouseY]);
    let title = document.getElementById("title");
    let animation = document.getElementById("gesture");
    title.className += " hidden"
    animation.className += " hidden"
    drawingState = "draw"
    mouseDownTime = millis();
}

function mouseDragged() {
    let parent = document.getElementById("sketch-holder").getBoundingClientRect();
    if (mouseX < 0 || mouseX > parent.width || mouseY < 0 || mouseY > parent.height) {
        return
    }
    drawPolyline.calculateApprox(5);
    drawPolyline.calculateBeziers(drawPolyline.approx);
    drawPolyline.recalculateBezierLengths();
    drawPolyline.calculateBezierResamples(count / 10);
    drawPolyline.add(mouseX, mouseY);
    originalPoints.push([mouseX, mouseY]);

}

function mouseReleased() {
    if (drawingState == "draw") {
        if (drawPolyline.points.length > minPoints) {
            drawPolyline.calculateApprox(width / 1000);
            drawPolyline.calculateBeziers(drawPolyline.approx);
            drawPolyline.recalculateBezierLengths();
            drawPolyline.calculateBezierResamples(count);
            clickedTime = millis();
            drawingState = "animate";
        }
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

function windowResized() { 
    let parent = document.getElementById("sketch-holder").getBoundingClientRect();
    regenerateSourceCurve(current);
    resizeCanvas(parent.width, parent.height); 
}
