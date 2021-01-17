//Quest SnowFlake Project

//Initial Variables

//generation parameters
let symmetrieNumber = 6; //how many arms the snowflake has (typically 6)
let angleVarianzPIDivider = 1; //PI is divided by this number to define the variance in branching angles
let radius = 200; //randius of the snowflake
let endLength = 2; //length of the branch at which recursions stops

//drawing parameters
let thickness = 6; //thicknes of the lines
let thicknesIsLengthDependent = false; //is the stroke thicknes dependent on the lenght of the branch?
let thicknesFactor = 0.005; //if the stroke thicknes is dependent on the lenght of the branch, this is multiplied with the length which is multiplied with the thickness
let strokeAlpha = 25; //alpha of the lines

//menu
let showMenu = false;
let showHelpText = true;

let parentDiv;
let helpTextDiv;
let helpText;
let radiusSlider;
let angleVarianzSlider;
let endLengthInput;

let thicknessInput;
let strokeAlphaSlider;
let thicknesLengthToggle;
let thicknessLengthSlider;

let generateButton;

//Setup Canvas
function setup() {
	createCanvas(1200,800);
	generateMenu();
	generateSnowflake();
}



function generateMenu() {
	parentDiv = createDiv('');
	parentDiv.style('color', 'white');

	helpTextDiv = createDiv('');
	helpTextDiv.style('color', 'white');

	helpText = createP('Press M to Show Menu Options');
	helpText.parent(helpTextDiv);


	radiusSliderP = createP('Radius ');
    radiusSliderP.parent(parentDiv);
    radiusSlider = createSlider(0, width / 2, width / 2.5, 1);
    radiusSlider.parent(radiusSliderP);

    angleVarianzSliderP = createP('Angle Varianz ');
    angleVarianzSliderP.parent(parentDiv);
    angleVarianzSlider = createSlider(1, 10, 0.1, 1);
    angleVarianzSlider.parent(angleVarianzSliderP);

    endLenghtP = createP('End Length ');
    endLenghtP.parent(parentDiv);
    endLengthInput = createInput('2');
    endLengthInput.parent(endLenghtP);

    strokeAlphaSliderP = createP('Line Alpha ');
    strokeAlphaSliderP.parent(parentDiv);
    strokeAlphaSlider = createSlider(0, 255, 25, 1);
    strokeAlphaSlider.parent(strokeAlphaSliderP);

    thicknessInputP = createP('Line Thickness ');
    thicknessInputP.parent(parentDiv);
    thicknessInput = createInput('6');
    thicknessInput.parent(thicknessInputP);

    thicknesLengthToggle = createCheckbox('Line Thickness is Length Dependent ', false);
    thicknesLengthToggle.parent(parentDiv);

    thicknessLengthSliderP = createP('Thicknes/length factor ');
    thicknessLengthSliderP.parent(parentDiv);
    thicknessLengthSlider = createSlider(0, 0.1, 0.05, 0.001);
    thicknessLengthSlider.parent(thicknessLengthSliderP);

    hideMenuText = createP('Press M to Hide Menu');
    hideMenuText.parent(parentDiv);

    generateButton = createButton('Generate');
    generateButton.mousePressed(generateSnowflake);
    generateButton.parent(parentDiv);

    parentDiv.position(10, 0);
    parentDiv.hide();

    helpTextDiv.position(10,0);
}

function keyReleased() {
    console.log(key);
    switch (key) {
        case ' ':
            generateSnowflake();
            break;
        case 'M':
            showMenu = !showMenu;
            showMenu ? parentDiv.show() : parentDiv.hide();
            showHelpText = !showHelpText;
            showHelpText ? helpTextDiv.show() : helpTextDiv.hide();
            break;
    }
}

function generateSnowflake()  {
	background(0);

    radius = radiusSlider.value() / 2;
    angleVarianzPIDivider = angleVarianzSlider.value();
    endLength = endLengthInput.value();
    thickness = thicknessInput.value();
    strokeAlpha = strokeAlphaSlider.value();
    thicknesIsLengthDependent = thicknesLengthToggle.checked();
    thicknesFactor = thicknessLengthSlider.value();

    let seed = random(255);
    for (let i = 0; i < symmetrieNumber; ++i) {
        randomSeed(seed);
        generateBranch(createVector(width / 2, height / 2), radius, (TWO_PI / symmetrieNumber) * i);
    }
}

function generateBranch(origin, length, angle) {
	if (length < endLength) {
        return;
    }

    let randomAngle = random(0, PI / angleVarianzPIDivider);
    push();
    translate(origin.x, origin.y);
    rotate(angle);
    generateBranch(createVector(0, 0), length / 2, 0);
    generateBranch(createVector(length, 0), length / 2, 0);
    generateBranch(createVector(length / 2, 0), length / 2, -randomAngle);
    generateBranch(createVector(length / 2, 0), length / 2, randomAngle);

    stroke(255, strokeAlpha);
    strokeWeight(thicknesIsLengthDependent ? (thickness * (length * thicknesFactor)) : thickness);
    line(0, 0, length, 0);
    pop();
}