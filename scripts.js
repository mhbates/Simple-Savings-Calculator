// init this variable first because functions below depend on it
var centerDiv = document.getElementById("div1");

// function to change 'timeframe' input placeholder text to match Compound Rate radio selection
var currentCompoundRate;
function compoundDaily()  {
    currentCompoundRate = document.getElementById("dailyCompound").value;
    document.getElementById("timeframe").placeholder = "Enter # of " + currentCompoundRate + "s here";
}

function compoundMonthly()  {
    currentCompoundRate = document.getElementById("monthlyCompound").value;
    document.getElementById("timeframe").placeholder = "Enter # of " + currentCompoundRate + "s here";
}

function compoundYearly()  {
    currentCompoundRate = document.getElementById("yearlyCompound").value;
    document.getElementById("timeframe").placeholder = "Enter # of " + currentCompoundRate + "s here";
}



// runs the calculation and generates results table
function calc() {

    // if results table already exists from previous calculation, clear it before performing next calculation
    while (document.getElementById("createTable"))
    {
        var removeTable = document.getElementById("createTable");
        centerDiv.removeChild(removeTable);
    }

    // init variables for input and convert them to floating numbers or integers
    var principal = document.getElementById("principal").value;
    principal = parseFloat(principal);

    var interestRate = document.getElementById("interestRate").value;
    interestRate = parseFloat(interestRate);

    var timeframe = document.getElementById("timeframe").value;
    timeframe = parseInt(timeframe);

    // convert interest rate % into decimal form
    var interestDecimal = interestRate/100;

    // create blank html table and append it to the div container
    var createTable = document.createElement("table");
    createTable.id = "createTable";
    centerDiv.appendChild(createTable);

    // adds header elements to the table (Year, New Balance, etc)
    var resultHead = createTable.createTHead();
    var headRow = resultHead.insertRow();
    var headerCell0 = document.createElement("th");
    var headerCell1 = document.createElement("th");
    var headerCell2 = document.createElement("th");
    headerCell0.innerHTML = currentCompoundRate;
    headRow.appendChild(headerCell0);
    headerCell1.innerHTML = "New Balance";
    headRow.appendChild(headerCell1);
    headerCell2.innerHTML = "Interest";
    headRow.appendChild(headerCell2);

    // run calculation and fill table rows until the # of timeframe entered is reached
    for (var timeCount = 0; timeCount <= timeframe; ++timeCount)
    {
        // var used in yearly change calculation a few lines below (eg Year 2 Balance minus Year 1 Balance)
        var oldBalance = newBalance 

        // calculate new balance (principal * (interest rate to the power of timeCount))
        if (currentCompoundRate == "Day") {
            var newBalance = principal * Math.pow(1 + (interestDecimal/365), timeCount);
        }
        else if (currentCompoundRate == "Month") {
            var newBalance = principal * Math.pow(1 + (interestDecimal/12), timeCount);
        }
        else if (currentCompoundRate == "Year") {
            var newBalance = principal * Math.pow(1 + interestDecimal, timeCount);
        }

        // calculates yearly change (eg Year 2 Balance minus Year 1 Balance)
        var amountChange = newBalance - oldBalance;

        // adds row and cells to the table (for current year)
        var resultTable = document.getElementById("createTable");
        var tableRow = resultTable.insertRow(1 + timeCount);
        var cell0 = tableRow.insertCell(0);
        var cell1 = tableRow.insertCell(1);
        var cell2 = tableRow.insertCell(2);

        // fills table cells with appropriate numbers (what year it is, what the new balance is, etc)
        cell0.innerHTML = timeCount;
        cell1.innerHTML = "$" + newBalance.toFixed(2);

        // if yearly change value is not a number, fill the cell with $0.00 (this fixes Year 0 yearly change weirdness)
        // else, if the yearly change value IS a number, insert the appropriate value
        if (isNaN(amountChange)) {
            cell2.innerHTML = "$0.00";
        } else  {
            cell2.innerHTML = "$" + amountChange.toFixed(2);
        }
    }

    var totalInterest = document.createElement("P");
    totalInterest.id = "totalInterest";
    totalInterest.innerHTML = "Total Interest: $" + ((newBalance - principal).toFixed(2));
    centerDiv.appendChild(totalInterest);

}




// Clear button also clears table from last calculation
function clearTable() {
    document.getElementById("timeframe").placeholder = "Select compound rate";
    if (document.getElementById("createTable"))
    {
        var removeTable = document.getElementById("createTable");
        centerDiv.removeChild(removeTable);
    }
    if (document.getElementById("totalInterest"))
    {
        centerDiv.removeChild(totalInterest);
    }
}