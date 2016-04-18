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

    // create html table and append it to the div container
    var createTable = document.createElement("table");
    createTable.id = "createTable";
    centerDiv.appendChild(createTable);

    var resultHead = createTable.createTHead();
    var headRow = resultHead.insertRow();
    var headerCell0 = document.createElement("th");
    var headerCell1 = document.createElement("th");
    headerCell0.innerHTML = "Year";
    headRow.appendChild(headerCell0);
    headerCell1.innerHTML = "New Balance";
    headRow.appendChild(headerCell1);

    // run calculation and fill table rows until the # of years entered is reached
    for (var yearCount = 0; yearCount <= years; ++yearCount)
    {
        var newBalance = principal * Math.pow(1 + interestDecimal, yearCount);

        var resultTable = document.getElementById("createTable");

        var tableRow = resultTable.insertRow(1 + yearCount);

        var cell0 = tableRow.insertCell(0);
        var cell1 = tableRow.insertCell(1);

        cell0.innerHTML = yearCount;
        cell1.innerHTML = "$" + newBalance.toFixed(2);


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