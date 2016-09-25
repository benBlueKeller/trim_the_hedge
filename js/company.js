function mathRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Created by Benjamin on 2/11/2016.
 */

//TODO::1.2 figure out how demand is affected by quality


function qualityEffectsDemand(company) {
//quality is determined by two factors
    // 1.ratio of SC to !SC employees
    var ratioForSC = company.aSCEmployees / (company.aFTEmployees + company.aPTEmployees);
    var deduction = Math.round((0.5 * ratioForSC) * this.aInitialDemand);
    var possibleDeductions = [];
    for (deduction; deduction > 0; deduction--) {
        possibleDeductions.push(deduction);
    }
    var chosenDeduction = function () {
        var i = mathRandom(0, possibleDeductions.length);
        return possibleDeductions[i];
    };
    //chance deduction happens related to ratio
    if (Math.random() > ratioForSC) {
        this.aDemand -= chosenDeduction();
        console.log("deduction");
    } else {
        console.log("no deduction");
    }
    //2. ratio of PT to FT employees
        var ratioForPT = company.aFTEmployees / company.aPTEmployees;
    //Perhaps whether the ratio improved or
    //Math.floor(Math.random() * (max - min + 1)) + min;
}

function productionCalculation(company) {
    var happinessFactor = 0.01 * company.employeeHappiness;
    return company.aFTEmployees * (company.aPerWorkerProduction * happinessFactor) + company.aSCEmployees * (company.aPerWorkerProduction * 0.85 * happinessFactor) + company.aPTEmployees * (company.aPerWorkerProduction * happinessFactor);
}

function expensesCalculation(company) {
    var overhead = 1000;
    var wages = company.aFTEmployees * 260 + company.aSCEmployees * 180 + company.aPTEmployees + 110;
    return overhead + wages;
}

function salesForDay(company) {
    var salesMin = company.aDemand / 30 * 0.85;
    var salesMax = company.aDemand / 30 * 1.1;
    var sales = mathRandom(salesMin, salesMax);
    console.log(company.aName + " sells " + sales);
    company.aQuarterSales += sales * company.aPricePerUnit;
    company.aPurse += sales * company.aPricePerUnit;
    this.aInventory -= sales;
}

function productionForDay(company) {
    var production = Math.floor(productionCalculation(company));
    console.log(company.aName + " makes " + production);
    company.aInventory += production;
}

function expensesForDay(company) {
    var expenses = expensesCalculation(company) / 30;
    company.aPurse -= expenses;
    company.aQuarterExpenses += expenses;
    console.log(company.aName + " spends " + expenses);
}

function profitCalculation(sales, expenses) {
    return (sales - expenses) / sales;
}

function appraisalAfterQuarter(company) {
    var quarterProfit = company.aQuarterSales - company.aQuarterExpenses;
    var aprxYearlyProfit = quarterProfit * 4; 
    var risk = 0.20;
    return aprxYearlyProfit / risk;
}

function quarterEvent(company) {
    //var companyName = company.aName;
//clock countsdown
//replace Button with clock
//at end of quarter, clock:
//resets firingsThisQuarter to 0
    var companyName = company.aName,
        i = 30,
        thisClockTag = clockTag(companyName, i),
        buttonClassString = ".start." + companyName,
        clockClassString = ".clock." + companyName,
        action = function () {
            if (i > 0) {
                console.log(companyName + " day " + i);
                thisClockTag = clockTag(companyName, i);
                $(clockClassString).replaceWith(thisClockTag);
                i--;
                salesForDay(company);
                productionForDay(company);
                expensesForDay(company);
                console.log("Quarter Profit Margin = " + profitCalculation(company.aQuarterSales, company.aQuarterExpenses));
                setCompanyHTML();
                setTimeout(action, 1000);
            }
        },
        endQuarterActions = function () {
            company.quarterActive = false;
            //End Calculations
            company.quartersPassed++;
            var appraisal = Math.round(appraisalAfterQuarter(company));
            var quarterFirings = company.firingsThisQuarter;
            var happinessDeduction = Math.pow(1.2, quarterFirings);
            company.totalFirings += company.firingsThisQuarter;
            company.employeeHappiness -= happinessDeduction;
            
            var expenseTarget = expensesCalculation(company);
            var profitMargin = profitCalculation(company.aQuarterSales, company.aQuarterExpenses);
            console.log(company);
            console.log("     End " + company.aName + " 1/4 firings = " + quarterFirings);
            console.log("         happiness deduction = " + happinessDeduction);
            console.log("                  prices are = " + company.aPricePerUnit);
            console.log("                expenses are = " + company.aQuarterExpenses);
            console.log("              expense target = " + expenseTarget);
            console.log("               Profit Margin = " + profitMargin);
            console.log("               1/4 Appraisal = " + appraisal);
            //resets
            company.firingsThisQuarter = 0;
            company.aQuarterExpenses = 0;
            company.aQuarterSales = 0;
            company.aAppraisal = appraisal;
            qualityEffectsDemand(company);
            setCompanyHTML();
            var companyCapitalized = capitalizeFirstLetter(companyName);
            $(clockClassString).replaceWith('<Button id="start' + companyCapitalized + '" class="start ' + companyName + '">Next 1/4</Button>');
            var index = companiesInAction.indexOf(companyName);
            companiesInAction.splice(index, 1);
            document.getElementById(company.aName + "Sell").style.display = 'inline-block';
            console.log(companiesInAction);
            return;
        };
    setTimeout(action, 1000);
    setTimeout(endQuarterActions, 1000 * 30 + 1);
    //beginning actions
    companiesInAction.push(companyName);
    document.getElementById(company.aName + "Sell").style.display = "none";
    console.log("clock started:" + companyName + companiesInAction);
    $(buttonClassString).replaceWith(thisClockTag);
    console.log(company);
}

//TODO::2/19 1 code for production and sales from inventory
//take production calculation and add it to the inventory
//take demand and subtract from inventory (nonMVP-perhaps every likely to earn between 85% and 110% of demand)
//add price to profits

function Company(nameAsString, FTEmployees, PTEmployees, SCEmployees, healthBenefits, employeeHappiness) {
    this.aName = nameAsString;
    this.aFTEmployees = FTEmployees;
    this.aPTEmployees = PTEmployees;
    this.aSCEmployees = SCEmployees;
    this.aHealthBenefits = healthBenefits;
    this.firingsThisQuarter = 0;
    this.totalFirings = 0;
    this.quartersPassed = 0;
    this.employeeHappiness = employeeHappiness;
    this.quarterActive = false;
    this.aPerWorkerProduction = 10; //fixme::
    function findInitialProfits(company) {
        var expenses = expensesCalculation(company);
        return 0.3 * expenses + expenses;
    }

    this.aProfits = findInitialProfits(this);
    this.aInitialDemand = Math.floor(0.85 * productionCalculation(this));
    this.aDemand = this.aInitialDemand;
    this.aPricePerUnit = this.aProfits / this.aDemand;
    this.aPurse = this.aProfits / 15;
    this.aInventory = Math.floor(.05 * productionCalculation(this));
    this.aQuarterSales = 0;
    this.aQuarterExpenses = 0;
    this.aAppraisal = 0;
}

/*function profitCalculation () {
 object of the game is to cut expenses to boost profit margins, so company can ge sold at higher rate than bought
 profit = sales - expenses
 profit = %of(workerHappiness) - (wages + overhead)
 Sales(Productivity):
 as employee happiness goes down so does their productivity.
 after employee happiness, it all efeects sales because due to reputation.
 for initisl simplification sales will be a part of those produced
 so profit = %of(workerHappiness) - expenses
 Expenses:
 wages = for(category) {wage/employeeInCategory * num of workers each category}
 base value (overhead)
 for initial simplification overhead will merely be added to skew the effects each wage has on expenses
 `so profit = sales - (wages + overhead)
 profit = %of(workerHappiness) - (wages + overhead)
 Expenses Rethink:
 There is public demand for products. I in warehouse capacity, public demand. Employees contribute to warehouse capacity.
 As employees are fired, public opinion reduces demand.
 As SC, PT employees are hired, quality goes down, which reduces demand.
 Company must be made more profitable and sold before bad decisions catch up.
 So
 employees produce x amount of I
 public opinion is diminished by employee happiness and quality
 public opinion is raised by price
 demand = random num < public opinion && > 75% of public opinion
 let's allow price to be controlled by player

 So Every Quarter
 employees produce x amount of goods
 and x amount of goods are sold based on poblic opinion



 }*/

Company.prototype.getHappiness = function () {
    return this.employeeHappiness;
};

Company.prototype.getInventory = function () {
    return this.aInventory;
};

Company.prototype.getProfit = function () {
    return profitCalculation(this);
};

Company.prototype.getPurse = function () {
    return this.aPurse;
};


Company.prototype.startQuarter = function () {
    this.quarterActive = true;
    //var aThis = this;

    console.log(this.aName + " profits = " + this.aProfits);
    console.log(productionCalculation(this));
    //end quarter actions
    quarterEvent(this);
    /*  setTimeout(function () {
     aThis.quarterActive = false;
     //End Calculations
     aThis.quartersPassed++;
     var quarterFirings = aThis.firingsThisQuarter;
     var happinessDeduction = Math.pow(1.2, quarterFirings);
     aThis.totalFirings += aThis.firingsThisQuarter;
     aThis.employeeHappiness -= happinessDeduction;
     var profit = profitCalculation(aThis);
     var expenses = expensesCalculation(aThis);
     var profitMargin = (profit - expenses) / profit;
     console.log(aThis);
     console.log("     End " + aThis.aName + " 1/4 firings = " + quarterFirings);
     console.log("         happiness deduction = " + happinessDeduction);
     console.log("                  prices are = " + aThis.aPricePerUnit);
     console.log("                expenses are = " + expenses);
     console.log("            Profit Margin is !!!!!!!!FIX THIS= " + profitMargin);
     //resets
     aThis.firingsThisQuarter = 0;
     setCompanyHTML();
     }, 30000);*/
    /*

     var action = function () {
     console.log("149");
     for (var i = 0; i < 30; i++) {
     salesForDay(aThis);
     console.log("for" + i + aThis.aPurse);
     setTimeout(action, 1000);
     }
     };
     setTimeout(action, 1000);
     */
};

Company.prototype.fireFT = function () {
    if (this.quarterActive === true) {
        this.aFTEmployees--;
        this.firingsThisQuarter++;
    } else {
        console.log("Quarter is Inactive");
    }
};

Company.prototype.firePT = function () {
    if (this.quarterActive === true) {
        this.aPTEmployees--;
        this.firingsThisQuarter++;
    } else {
        console.log("Quarter is Inactive");
    }
};

Company.prototype.fireSC = function () {
    if (this.quarterActive === true) {
        this.aSCEmployees--;
        this.firingsThisQuarter++;
    } else {
        console.log("Quarter is Inactive");
    }
};

Company.prototype.hireFT = function () {
    if (this.quarterActive === true) {
        this.aFTEmployees++;
    } else {
        console.log("Quarter is Inactive");
    }
};

Company.prototype.hirePT = function () {
    if (this.quarterActive === true) {
        this.aPTEmployees++;
    } else {
        console.log("Quarter is Inactive");
    }
};

Company.prototype.hireSC = function () {
    if (this.quarterActive === true) {
        this.aSCEmployees++;
    } else {
        console.log("Quarter is Inactive");
    }
};

Company.prototype.getFTEmployees = function () {
    return this.aFTEmployees;
};
Company.prototype.getPTEmployees = function () {
    return this.aPTEmployees;
};
Company.prototype.getSCEmployees = function () {
    return this.aSCEmployees;
};

