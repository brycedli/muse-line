let drawPolyline; // Declare object
let sourcePolyline;
let resampleSource;
let originalPoints = [];
let font;

var count = 200;

function preload() {
    font = loadFont('https://fonts.gstatic.com/s/inter/v3/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf')
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    drawPolyline = new ofPolyline();
    sourcePolyline = new ofPolyline();

    for (var i = 0; i < 10; i++) {
        sourcePolyline.add(width / 10 * i, random(height));
        
    }
    sourcePolyline.calculateApprox(5);
    sourcePolyline.calculateBeziers(sourcePolyline.approx);
    sourcePolyline.recalculateBezierLengths();
    sourcePolyline.calculateBezierResamples(count);
    resampleSource = sourcePolyline.getResampledByCount(count);
    resampleSource.calculateApprox(5);
    resampleSource.calculateBeziers(resampleSource.approx);
    resampleSource.recalculateBezierLengths();
    resampleSource.calculateBezierResamples(count);

}

function draw() {
    background(220);
    textFont(font)

    noFill();


    var resampleDraw = drawPolyline.getResampledByCount(count);
    // stroke(0);
    resampleDraw.calculateApprox(5);
    resampleDraw.calculateBeziers(resampleDraw.approx);
    resampleDraw.recalculateBezierLengths();
    resampleDraw.calculateBezierResamples(count);

    let lerpPolyline = new ofPolyline();

    for (let i = 0; i < resampleDraw.bezierResamples.length; i++) {

        var drawPoint = resampleDraw.bezierResamples[i];
        var randomPoint = resampleSource.bezierResamples[i];
        let t = sin(millis() / 500) / 2 + 0.5;
        let finalPoint = p5.Vector.lerp(drawPoint, randomPoint, t);
        lerpPolyline.add(finalPoint.x, finalPoint.y, 1);
    }

    lerpPolyline.calculateApprox(5);
    lerpPolyline.calculateBeziers(lerpPolyline.approx);
    strokeWeight(20);
    stroke(0, 128);
    resampleDraw.displayCalculatedBeziers();
    resampleSource.displayCalculatedBeziers();
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





}

function mousePressed() {
    //myPolyline.clear();
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
    if (key == 'c') {
        copyToClipboard();
    }
    if (key == 'v') {
        pasteFromClipboard();
    }
    if (key == 'r') {
        drawPolyline.clear();
    }
}

function mouseReleased() {

}



function copyToClipboard() {
    let text = JSON.stringify(originalPoints);
    navigator.clipboard.writeText(text).then(() => {
        console.log('Coordinates copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}


function pasteFromClipboard() {
    navigator.clipboard.readText().then(text => {
        let pastedCoordinates = JSON.parse(text);
        sourcePolyline.clear();
        for (let i = 0; i < pastedCoordinates.length; i++) {
            sourcePolyline.add(pastedCoordinates[i][0], pastedCoordinates[i][1]);
        }
        sourcePolyline.calculateApprox(5);
        sourcePolyline.calculateBeziers(sourcePolyline.approx);
        sourcePolyline.recalculateBezierLengths();
        sourcePolyline.calculateBezierResamples(count);
        resampleSource = sourcePolyline.getResampledByCount(count);
        resampleSource.calculateApprox(5);
        resampleSource.calculateBeziers(resampleSource.approx);
        resampleSource.recalculateBezierLengths();
        resampleSource.calculateBezierResamples(count);
        console.log('Coordinates pasted from clipboard: ', pastedCoordinates);
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
}
