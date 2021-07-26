//Controller function
function getValue() {
    //put input values to vars
    let loanAmount = document.getElementById("loanAmount").value;
    let payments = document.getElementById("payments").value;
    let rate = document.getElementById("rate").value;
    loanAmount = parseFloat(loanAmount);
    payments = parseFloat(payments);
    rate = parseFloat(rate) / 100;
    //parse vars to intergers


    let returnObj = calculateVars(loanAmount, payments, rate);

    display(returnObj);
}
//logic function 
function calculateVars(loanAmount, payments, rate) {
    let returnObj = {};
    let monthlyPayment = (loanAmount * (rate / 12) * ((1 + rate / 12) ** payments)) / (((1 + rate / 12) ** payments) - 1);
    returnObj.month = [];
    returnObj.month[0] = 0;
    returnObj.monthlyPayment = [];
    returnObj.monthlyPayment[0] = monthlyPayment;
    returnObj.principal = [];
    returnObj.principal[0] = 0;
    returnObj.interest = [];
    returnObj.interest[0] = 0;
    returnObj.totalInterest = [];
    returnObj.totalInterest[0] = 0;
    returnObj.balance = [];
    returnObj.balance[0] = loanAmount;

    for (let i = 1; i <= payments; i++) {
        returnObj.month[i] = i;
        returnObj.monthlyPayment[i] = parseFloat(monthlyPayment);
        returnObj.interest[i] = parseFloat((returnObj.balance[i - 1] * (rate / 12)));
        returnObj.principal[i] = parseFloat((returnObj.monthlyPayment[i] - returnObj.interest[i]));
        returnObj.totalInterest[i] = parseFloat((returnObj.totalInterest[i - 1] + returnObj.interest[i]));
        returnObj.balance[i] = (returnObj.balance[i - 1] - returnObj.principal[i]);
    }

    //calcuate total principal and add that key to returnObj
    let totalPrincipal = 0
    for (let i = 0; i < returnObj.principal.length; i++) {
        totalPrincipal += returnObj.principal[i];
    }
    returnObj.totalPrincipal = totalPrincipal;


    returnObj.displayTotalInterest = returnObj.totalInterest[[returnObj.month.length - 1]];

    returnObj.totalCost = returnObj.totalPrincipal + parseFloat(returnObj.displayTotalInterest);


    return returnObj;
}

//display function
function display(returnObj) {
    //display monthly payments
    monthlyPayment = parseFloat(returnObj.monthlyPayment).toFixed(2)
    document.getElementById("yourMonthlyPayment").innerHTML = `$${monthlyPayment}`;

    //display main-right details
    document.getElementById("totalPrincipal").innerHTML = `$${returnObj.totalPrincipal.toFixed(2)}`;
    document.getElementById("totalInterest").innerHTML = `$${returnObj.displayTotalInterest.toFixed(2)}`;
    document.getElementById("totalCost").innerHTML = `$${returnObj.totalCost.toFixed(2)}`
    //assign vars to tableBody and TemplateRow elements
    let tableBody = document.getElementById("tableResults");
    let templateRow = document.getElementById("templateRow")

    //clear table-body
    tableBody.innerHTML = "";

    //add rows to the table
    //let i runs from 1 because the first row of the data table is not displayed  
    for (let i = 1; i < returnObj.month.length; i += 1) {

        let tableRow = document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = returnObj.month[i];
        rowCols[1].textContent = returnObj.monthlyPayment[i].toFixed(2);
        rowCols[2].textContent = returnObj.principal[i].toFixed(2);
        rowCols[3].textContent = returnObj.interest[i].toFixed(2);
        rowCols[4].textContent = returnObj.totalInterest[i].toFixed(2);
        rowCols[5].textContent = returnObj.balance[i].toFixed(2);

        tableBody.appendChild(tableRow);
    }
}