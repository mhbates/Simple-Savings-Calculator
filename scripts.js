// init this variable first because functions below depend on it
var centerDiv = document.getElementById("div1");

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
    principal = parseFloat(principal); // doing this because type=number is still considered a string and not a number

    var interestRate = document.getElementById("interestRate").value;
    interestRate = parseFloat(interestRate);

    var years = document.getElementById("years").value;
    years = parseInt(years);

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
    headerCell0.innerHTML = "Year";
    headRow.appendChild(headerCell0);
    headerCell1.innerHTML = "New Balance";
    headRow.appendChild(headerCell1);
    headerCell2.innerHTML = "Interest";
    headRow.appendChild(headerCell2);

    // run calculation and fill table rows until the # of years entered is reached
    for (var yearCount = 0; yearCount <= years; ++yearCount)
    {
        // var used in yearly change calculation a few lines below (eg Year 2 Balance minus Year 1 Balance)
        var oldBalance = newBalance 

        // calculate new balance (principal * (interest rate to the power of yearCount))
        var newBalance = principal * Math.pow(1 + interestDecimal, yearCount);

        // calculates yearly change (eg Year 2 Balance minus Year 1 Balance)
        var amountChange = newBalance - oldBalance;

        // adds row and cells to the table (for current year)
        var resultTable = document.getElementById("createTable");
        var tableRow = resultTable.insertRow(1 + yearCount);
        var cell0 = tableRow.insertCell(0);
        var cell1 = tableRow.insertCell(1);
        var cell2 = tableRow.insertCell(2);

        // fills table cells with appropriate numbers (what year it is, what the new balance is, etc)
        cell0.innerHTML = yearCount;
        cell1.innerHTML = "$" + newBalance.toFixed(2);

        // if yearly change value is not a number, fill the cell with $0.00 (this fixes Year 0 yearly change weirdness)
        // else, if the yearly change value IS a number, insert the appropriate value
        if (isNaN(amountChange)) {
            cell2.innerHTML = "$0.00";
        } else  {
            cell2.innerHTML = "$" + amountChange.toFixed(2);
        }
    }
}

// Clear button also clears table from last calculation
function clearTable() {
    if (document.getElementById("createTable"))
    {
        var removeTable = document.getElementById("createTable");
        centerDiv.removeChild(removeTable);
    }
}