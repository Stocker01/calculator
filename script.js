"use strict"

//Define some variables to not repeat ourselves later :3 we are selecting elements in the DOM with the 
//following attributes and storing them in variables
const userNumbers = [...document.querySelectorAll('[data-number]')];
const userOperants = [...document.querySelectorAll('[data-operant]')];
const clearCalc = document.querySelector('[data-clear]');
const equals = document.querySelector('[data-equals]');
const calcOutput = document.querySelector('#output-one');
const calcOutput2 = document.querySelector('#output-two');

// Listens to click on the clear / AC button and calls clearCalculator function when clicked
clearCalc.addEventListener('click', clearCalculator, false); 
function clearCalculator() {
    calcOutput.textContent = 0;
    calcOutput.removeAttribute("style", "font-size: 2.5em; !important")
    calcOutput.removeAttribute("style", "font-size: 1.5em; !important")
    calcOutput2.textContent = "";
    window.Equals = false;
}

//querySelectorAll[data-] is going to return us a NodeList object, we need to add an event listner to each of these
//to capture the users button presses
//A NodeList object can be accessed like an array but does not have the full functionality of a standard array
Array.from(userNumbers).forEach(function(numberElement) {
    numberElement.addEventListener('click', calculator, false); 

    function calculator() { //Stops user from entering values on calculator output. clears calc then continues inputs. 
        if(window.Equals == true)  {
            clearCalculator();
            valueConcat();
        } else {
            valueConcat();
        }
    }

    //This function takes the calculator number inputs and adds them into the calculator output
    function valueConcat() {
        //Defines valueOne as whatever singular value that was entered by user in the DOM eg"1", "8" etc 
        var userValue = numberElement.textContent;
        const valueStr = calcOutput.textContent;
        if(userValue == "." && calcOutput.textContent == "0") {
            //If . is first selected we have to keep the "0" in the calculator 
            calcOutput.append(userValue);
        } else if(calcOutput.textContent == "0") {
            //If the value selected is not "0" we need to change the first output number to the value selected
            calcOutput.textContent = userValue;
        } else if(valueStr.slice(-1) == "." && userValue == "."){
            // Stops the calculator from adding multiple "." together 
            return;
        } else {
            // else append whatever values are selceted by the user 
            calcOutput.append(userValue);
        }
    }
});

//Same as before except this time for the operator the user selected, multiplication, division etc..
Array.from(userOperants).forEach(function(operantElement) {
    operantElement.addEventListener('click', operatorActive, false);
    //Function adds the operator selected the the output and puts the main output into the secondary output field
    //for reference for the user
    function operatorActive() {
        //Stops you from just continuously selecting an operant and it inputing an empty operant into the secondary output. 
        var userOperant = operantElement.textContent;
        if(calcOutput.textContent === "x" || calcOutput.textContent === "-" || calcOutput.textContent === "÷") {
            calcOutput.textContent = userOperant; 
        } else {
            calcOutput2.textContent = calcOutput.textContent;
            calcOutput.textContent = userOperant; 
        }     
    }
});

//Listens for click on the equals button and calls mathsTime function
equals.addEventListener('click', mathsTime, false);

function mathsTime() {
    window.Equals = true;
    //Define variable and slices operator from calcOutput eg we want "123" not "x123", "%123" etc
    const valueStr2Dirty = calcOutput.textContent;
    const valueStr2 = valueStr2Dirty.slice(1);
    const valueStr = calcOutput2.textContent;
    //Sets output2 back to 
    calcOutput2.textContent = "";
    whichOperator();

    function whichOperator() { //finds which operator was used and does appropriate maths
        let finalOutput;
        if(valueStr2Dirty.charAt(0) == "x") {
            finalOutput = valueStr * valueStr2;
            formatOutput();
        } else if(valueStr2Dirty.charAt(0) == "÷") {
            finalOutput = valueStr / valueStr2;
            formatOutput();
        } else if(valueStr2Dirty.charAt(0) == "-") {
            finalOutput = valueStr - valueStr2;     
            formatOutput();
        } 

        function formatOutput() { //changes outputs text size to fit calculator & manages decimal places
            let finalOutputStr = finalOutput.toString();
            limitDecimals();
            function limitDecimals() {
                if(finalOutputStr.indexOf('.') === -1) {
                    var finalOutputRounded = finalOutput.toFixed(0);
                } else {
                    //Checks how many decimal places there are
                    let index = finalOutputStr.indexOf('.');
                    let DecimalLength = finalOutputStr.substring(index + 1).length;
                    console.log(DecimalLength, finalOutput);
                    //Limits max decimal places accordingly 
                    if(DecimalLength > 4) {
                        finalOutputRounded = finalOutput.toFixed(4);
                    } else {
                        finalOutputRounded = finalOutput.toFixed(2);
                    }
                }
                //Adjusts font size based on output value to fit it within the calculator
                var finalOutputLength = finalOutputRounded.length;
                if(finalOutputLength <= 17 && finalOutputLength > 9) {
                    calcOutput.setAttribute("style", "font-size: 2.5em; !important")
                    calcOutput.textContent = finalOutputRounded;
                } else if(finalOutputLength >= 18 ){
                    calcOutput.setAttribute("style", "font-size: 2em; !important")
                    calcOutput.textContent = finalOutputRounded;
                } else {
                    calcOutput.textContent = finalOutputRounded;
                }
            }

        }

    }
}








