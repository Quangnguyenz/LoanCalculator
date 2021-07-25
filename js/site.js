//Controller function
function getValue(){
    //put input values to vars
    let loanAmount = document.getElementById("loanAmount").value;
    let payments = document.getElementById("payments").value;
    let rate = document.getElementById("rate").value;
    loanAmount = parseInt(loanAmount);
    payments = parseInt(payments);
    rate = parseInt(rate)/100;
    let monthlyPayment = (loanAmount*(rate/12)*((1+rate/12)**payments))/(((1+rate/12)**payments)-1);
//parse vars to intergers
    

    let returnObj = calculateVars(loanAmount, payments, rate, monthlyPayment);

    display(returnObj, monthlyPayment);
}
//logic function 
function calculateVars(loanAmount, payments, rate, monthlyPayment){

    let returnObj = {};
    returnObj.month = [];
    returnObj.month[0] = 0;
    returnObj.monthlyPayment = [];
    returnObj.monthlyPayment[0] = 0;  
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
        returnObj.monthlyPayment[i] = monthlyPayment.toFixed(2);
        returnObj.interest[i] = (returnObj.balance[i-1]*(rate/12)).toFixed(2);
        returnObj.principal[i] =  (returnObj.monthlyPayment[i] - returnObj.interest[i]).toFixed(2);
        returnObj.totalInterest[i] = (parseFloat(returnObj.totalInterest[i-1]) + parseFloat(returnObj.interest[i])).toFixed(2);
        returnObj.balance[i] = (returnObj.balance[i-1] - returnObj.principal[i]).toFixed(2);      
    }

    //remove the first row (that displays month 0) in the data table
    returnObj.month.shift();
    returnObj.monthlyPayment.shift(); 
    returnObj.principal.shift();
    returnObj.interest.shift();
    returnObj.totalInterest.shift();
    returnObj.balance.shift();
    
    return returnObj;

}

//display function
function display(returnObj, monthlyPayment){
    //display monthly payments
    document.getElementById("yourMonthlyPayment").innerHTML= "";
    monthlyPayment = parseFloat(monthlyPayment).toFixed(2)
    document.getElementById("yourMonthlyPayment").innerHTML= `$${monthlyPayment}`;
    //assign vars to tableBody and TemplateRow elements
    let tableBody = document.getElementById("tableResults");
    let templateRow = document.getElementById("templateRow")
    
    //clear table-body
    tableBody.innerHTML = "";
      
    //add rows to the table  
    for (let i = 0; i < returnObj.month.length; i += 1) {
        let tableRow = document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = returnObj.month[i];
        rowCols[1].textContent = returnObj.monthlyPayment[i];
        rowCols[2].textContent = returnObj.principal[i];
        rowCols[3].textContent = returnObj.interest[i];
        rowCols[4].textContent = returnObj.totalInterest[i];
        rowCols[5].textContent = returnObj.balance[i];
        
        tableBody.appendChild(tableRow);
    }
}