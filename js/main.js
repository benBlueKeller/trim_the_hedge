function toClassArray(element) {return element.className.split(/\s+/);}

//TODO:: create buy/sell
//BUY:: remove amount from assets and add company html
//SELL:: replace original html

function companyHTMLGenerator(companyName) {
    var html = '<div class="company ' + companyName + '">';
    html += '<h1>' + companyName + ' Company</h1>';
    html += '<div class="quarter ' + companyName + '">'
    html += '<Button id="start' + companyName + '" class="start '
     + companyName + '">Begin Quarter</Button>'
    html += '<button id="' + companyName + 'Sell">Sell</button>'
    html += '</div>';
    html += '<h3>Company Purse</h3><p id="' + companyName + 'Purse">0</p>';
    html += '<h3>Company Inventory</h3><p id="' + companyName + 'Inventory">0</p>';
    html += '<h3>Employee Happiness</h3><p id="' + companyName + 'Happiness">0</p>';
    html += '<h3>Quarterly Profits</h3><p id="' + companyName + 'Profits">0</p>';
    html += '<h3>FT Employees</h3><p id="' + companyName + 'FT">0</p>';
    html += '<Button id="hire' + companyName + 'FT">Hire</Button><Button id="fire' + companyName + 'FT">Fire</Button>';
    html += '<h3>PT Employees</h3><p id="' + companyName + 'PT">0</p>';
    html += '<Button id="hire' + companyName + 'PT">Hire</Button><Button id="fire' + companyName + 'PT">Fire</Button>';
    html += '<h3>SC Employees</h3><p id="' + companyName + 'SC">0</p>';
    html += '<Button id="hire' + companyName + 'SC">Hire</Button><Button id="fire' + companyName + 'SC">Fire</Button>';
    html += '<h3>Health Benefits</h3>';
    html += '<Button id="add' + companyName + 'Health">Add</Button><Button id="cut' + companyName + 'Health">Cut</Button>';
    html += '<h3>Retirement Plan</h3>';
    html += '<Button id="add' + companyName + 'Retirement">Add</Button><Button id="cut' + companyName + 'Retirement">Cut</Button>';
    html += '</div>';
    return html;
}

function buy(companyVar, domE) {
    var classArray = toClassArray(domE);
    companyVar = new Company(classArray[1], 40, 20, 10, 5, 100);
    domE.innerHTML = companyHTMLGenerator(companyVar.aName);
    wallet -= 0.1;
    setCompanyHTML();
} 

function sell(companyVar, domE) {
    var classArray = toClassArray(domE);
    domE.innerHTML = '<button id="' + classArray[1] + 'Buy">Buy</button>'
    console.log(companyVar + "\n  sold for:  $" + companyVar.aAppraisal);
    wallet += companyVar.aAppraisal;
    setCompanyHTML();
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clockTag(company, i) {
    var tag = '<strong class="clock ';
    tag += company;
    tag += '">';
    tag += i.toString();
    tag += '</strong>';
    return tag;
}



/*
function clock(company) {
    var companyName = company.aName;
    //clock countsdown
    //replace Button with clock
    //at end of quarter, clock:
        //resets firingsThisQuarter to 0
    var i = 30,
        thisClockTag = clockTag(companyName, i),
        buttonClassString = ".start." + companyName,
        clockClassString = ".clock." + companyName,
        action = function() {
            if (i > -1) {
                thisClockTag = clockTag(companyName, i);
                $(clockClassString).replaceWith(thisClockTag);
                i--;
                setTimeout(action, 1000);
            }
        },
        endOfQuarterActions = function() {
            var companyCapitalized = capitalizeFirstLetter(companyName);
            $(clockClassString).replaceWith('<Button id="start' + companyCapitalized + 
            '" class="start ' + companyName + '">Next 1/4</Button>');
            var index = companiesInAction.indexOf(companyName);
            companiesInAction.splice(index, 1);
            console.log(companiesInAction);
            return;
        };
    companiesInAction.push(companyName);
    console.log("clock started:" + companyName + companiesInAction);
    $(buttonClassString).replaceWith(thisClockTag);
    setTimeout(action, 1000);
    setTimeout(endOfQuarterActions, 1000*i+1);
}
*/

//TODO:sbk match employee id to Company employee


function setCompanyHTML() {
    document.getElementById('wallet').innerHTML = wallet.toString();
    try {
        document.getElementById('redHappiness').innerHTML = red.getHappiness().toString();
        document.getElementById('redProfits').innerHTML = red.getProfit().toString();
        document.getElementById('redFT').innerHTML = red.getFTEmployees().toString();
        document.getElementById('redPT').innerHTML = red.getPTEmployees().toString();
        document.getElementById('redSC').innerHTML = red.getSCEmployees().toString();
        document.getElementById('redPurse').innerHTML = red.getPurse().toString();
        document.getElementById('redInventory').innerHTML = red.getInventory().toString();
    } catch (e) {
        console.log("Error caught: red company likely nonexistent");
    }

    try {
        document.getElementById('greenHappiness').innerHTML = green.getHappiness().toString();
        document.getElementById('greenProfits').innerHTML = green.getProfit().toString();
        document.getElementById('greenFT').innerHTML = green.getFTEmployees().toString();
        document.getElementById('greenPT').innerHTML = green.getPTEmployees().toString();
        document.getElementById('greenSC').innerHTML = green.getSCEmployees().toString();
        document.getElementById('greenPurse').innerHTML = green.getPurse().toString();
        document.getElementById('greenInventory').innerHTML = green.getInventory().toString();
    } catch(e) {
    console.log("Error caught: green company likely nonexistent");
    }

    try {
        document.getElementById('blueHappiness').innerHTML = blue.getHappiness().toString();
        document.getElementById('blueProfits').innerHTML = blue.getProfit().toString();
        document.getElementById('blueFT').innerHTML = blue.getFTEmployees().toString();
        document.getElementById('bluePT').innerHTML = blue.getPTEmployees().toString();
        document.getElementById('blueSC').innerHTML = blue.getSCEmployees().toString();
        document.getElementById('bluePurse').innerHTML = blue.getPurse().toString();
        document.getElementById('blueInventory').innerHTML = blue.getInventory().toString();
    } catch(e) {
    console.log("Error caught: blue company likely nonexistent");
    }
}

var companiesInAction = [];
var quarterFirings = [];
var wallet = 0;
var red = new Company("red", 40, 20, 10, 5, 100);
var green = new Company ("green", 30, 15, 7, 3, 100);
var blue = new Company("blue", 20, 10, 5, 2, 100);

//create profit equation
//productivity = happiness
    //a record is kept of the firing each 1/4 in K:V w/K=company
    //record is tallied with each firing
    //record is reset with endAction of clock
//diminishes with fireing of workers and benefit cuttting
//the more workers that are fired each quarter and greater the benefit , the greater the effect each action has
//profit = employeePotential(productivity) - overhead

setCompanyHTML();



/*
//noinspection JSUnresolvedFunction
$(".start").mouseup(function () {
    //make button say the numbers
    var classList = this.className.split(/\s+/);
    clock(classList[1], red);
});//end click
*/

//noinspection JSUnresolvedFunction
$(document.body).on('click', '#redBuy', function() {
    buy(red, document.getElementById('redDiv'));
});

$(document.body).on('click', '#redSell', function() {
    sell(red, document.getElementById('redDiv'));
});

$(document.body).on('click', '#greenBuy', function() {
    buy(green, document.getElementById('greenDiv'));
});

$(document.body).on('click', '#greenSell', function() {
    sell(red, document.getElementById('greenDiv'));
});

$(document.body).on('click', '#blueBuy', function() {
    buy(blue, document.getElementById('blueDiv'));
});

$(document.body).on('click', '#blueSell', function() {
    sell(blue, document.getElementById('blueDiv'));
});

$(document.body).on('click', '#startred', function () {
    //clock("red");
    red.startQuarter();
    console.log("red click");
});//end click

//noinspection JSUnresolvedFunction
$(document.body).on('click', '#startgreen', function () {
    //clock("green");
    green.startQuarter();
    console.log("green click");
});//end click

//noinspection JSUnresolvedFunction
$(document.body).on('click', '#startblue', function () {
    //clock("blue");
    blue.startQuarter();
    console.log("blue click");
});//end click



$(document.body).on('click', "#hireredFT", function(){
    //hire("redFT", "red");
    //console.log("onclick = " + red.aFTEmployees);
    red.hireFT();
    setCompanyHTML();
   /* console.log("final HTML = " + red.aFTEmployees.toString());
    $('#redFT').innerHTML = red.aFTEmployees.toString();*/
});
$(document.body).on('click', "#fireredFT", function(){
    red.fireFT();
    setCompanyHTML();
    /*deprecated
    fire("redFT", "red");*/
});
$(document.body).on('click', "#hireredPT", function(){
    red.hirePT();
    setCompanyHTML();
    /*deprecated
    hire("redPT", "red");*/
});
$(document.body).on('click', "#fireredPT", function(){
    red.firePT();
    setCompanyHTML();
    /*deprecated
    fire("redPT", "red");*/
});
$(document.body).on('click', "#hireredSC", function(){
    red.hireSC();
    setCompanyHTML();
    /*deprecated
    hire("redSC", "red");*/
});
$(document.body).on('click', "#fireredSC", function(){
    red.fireSC();
    setCompanyHTML();
    /*deprecated
    fire("redSC", "red");*/
});

$(document.body).on('click', "#hiregreenFT", function(){
    green.hireFT();
    setCompanyHTML();
    /*deprecated
    hire("greenFT", "green");*/
});
$(document.body).on('click', "#firegreenFT", function(){
    green.fireFT();
    setCompanyHTML();
    /*deprecated
    fire("greenFT", "green");*/
});
$(document.body).on('click', "#hiregreenPT", function(){
    green.hirePT();
    setCompanyHTML();
    /*deprecated
    hire("greenPT", "green");*/
});
$(document.body).on('click', "#firegreenPT", function(){
    green.firePT();
    setCompanyHTML();
    /*deprecated
    fire("greenPT", "green");*/
});
$(document.body).on('click', "#hiregreenSC", function(){
    green.hireSC();
    setCompanyHTML();
    /*deprecated
    hire("greenSC", "green");*/
});
$(document.body).on('click', "#firegreenSC", function(){
    green.fireSC();
    setCompanyHTML();
    /*deprecated
    fire("greenSC", "green");*/
});

$(document.body).on('click', "#hireblueFT", function(){
    blue.hireFT();
    setCompanyHTML();
    /*deprecated
    hire("blueFT", "blue");*/
});
$(document.body).on('click', "#fireblueFT", function(){
    blue.fireFT();
    setCompanyHTML();
    /*deprecated
    fire("blueFT", "blue");*/
});
$(document.body).on('click', "#hirebluePT", function(){
    blue.hirePT();
    setCompanyHTML();
    /*deprecated
    hire("bluePT", "blue");*/
});
$(document.body).on('click', "#firebluePT", function(){
    blue.firePT();
    setCompanyHTML();
    /*deprecated
    fire("bluePT", "blue");*/
});
$(document.body).on('click', "#hireblueSC", function(){
    blue.hireSC();
    setCompanyHTML();
    /*deprecated
    hire("blueSC", "blue");*/
});
$(document.body).on('click', "#fireblueSC", function(){
    blue.fireSC();
    setCompanyHTML();
    /*deprecated
    fire("blueSC", "blue");*/
});
