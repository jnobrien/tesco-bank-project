// INDEX.HTML FUNCTIONS
function checkCode() {
  const userPhrase = document.getElementById('code').value.toLowerCase();
  const correctPhrase = 'money503020';
  if (userPhrase == correctPhrase) {
    document.getElementById('treasure-box').style.display = "none"
    document.getElementById('open-box').style.display = "flex"
    const unlockBtnText = document.getElementById('unlock-btn');
    unlockBtnText.innerText = "Unlocked!"
    const unlockBtn = document.getElementById('unlock');
    unlockBtn.style.backgroundColor = "#EE1C2E";
    setTimeout(function() {
        alert('Congratulations! You unlocked the treasure chest and your financial freedom!');
    }, 50);
  } else {
    alert('Sorry, the combination is not correct. Try again.');
  }
}


//JESSICA'S FUNCTIONS

//Object to store each option of where to spend money

const moneyThings = [
  {
    "source": "Rent",
    "cost": 600,
  },
  {
    "source": "Electricity",
    "cost": 50,
  },
  {
    "source": "Theatre tickets",
    "cost": 100,
  },
  {
    "source": "Order take-away",
    "cost": 50,
  },
  {
    "source": "New party outfit",
    "cost": 150,
  },
  {
    "source": "Groceries",
    "cost": 250,
  },
  {
    "source": "Gas and water",
    "cost": 100,
  },
  {
    "source": "Go bowling",
    "cost": 50,
  },
  {
    "source": "Go to the pub",
    "cost": 50,
  },
  {
    "source": "Buy new video game",
    "cost": 50,
  },
  {
    "source": "Netflix subscription",
    "cost": 50,
  },
  {
    "source": "Train tickets for a day trip",
    "cost": 100,
  },
  {
    "source": "Designer sunglasses",
    "cost": 100,
  },
  {
    "source": "New tech gadget",
    "cost": 250,
  },
  {
    "source": "Go to a cat cafe",
    "cost": 50,
  }
]

//This locates the div in the HTML file where we want this information to go and adds a paragraph for each object in the array

const moneyThingsDiv = document.getElementById('money-things');

moneyThings.forEach(bill => {
  const paragraph = document.createElement('p');
  paragraph.textContent = `${bill.source}: ${bill.cost}`;
  paragraph.id = `bill_${bill.source.toLowerCase()}`;
  paragraph.draggable = true;
  paragraph.ondragstart = drag;
  moneyThingsDiv.appendChild(paragraph);
});

//Drag and drop functions

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

//This function handles when an item is dropped into the Needs or Wants sections
function dropSubtract(event) {
  //identifies cost of the item in the array
  const data = event.dataTransfer.getData("text");
  const source = data.replace('bill_', '');
  const droppedBill = moneyThings.find(bill => bill.source.toLowerCase() === source);
  const payment = droppedBill.cost;
  
  //identifies the remaining paycheck
  const totalBudget = document.getElementById('budget-left');
  const budgetContent = totalBudget.textContent;
  const budget = parseInt(budgetContent, 10);
  const budgetLeft = budget - payment;
  
  //identifies needs total
  let needsTotal = document.getElementById('needs-total');
  const needsTotalText = needsTotal.innerText
  const needsTotalNumber = parseInt(needsTotalText);
  const needsUpdate = needsTotalNumber + payment;
  const needsUpdateText = String(needsUpdate);
  
  //identifies the wants total
  let wantsTotal = document.getElementById('wants-total');
  const wantsTotalText = wantsTotal.innerText
  const wantsTotalNumber = parseInt(wantsTotalText);
  const wantsUpdate = wantsTotalNumber + payment;
  const wantsUpdateText = String(wantsUpdate);
  
  //NEEDS
  if (event.currentTarget.id === "needs") {
    //if statement that only allows the event to occur if doing so does not exeed the budget
    if ((needsTotalNumber + wantsTotalNumber + payment) > 2000) {
      alert("This exceeds your paycheck budget.")
    } else {
        event.preventDefault();
        event.target.appendChild(document.getElementById(data));
  
        //updates the remaining paycheck
        totalBudget.innerText = budgetLeft;
  
        //updates the needs total
        needsTotal.innerText = needsUpdateText;
  
        //updates the needs percentage
        const needsPercent = document.getElementById('needs-percent');
        const budgetPercent = (needsUpdate / 2000) * 100;
        needsPercent.innerText = budgetPercent;

        //adds needs as a class
        const elementId = `bill_${source.toLowerCase()}`;
        const droppedElement = document.getElementById(elementId);
        droppedElement.classList.add("needs"); 
    }
  
    //WANTS
  } else if (event.currentTarget.id === "wants") {
      if ((needsTotalNumber + wantsTotalNumber + payment) > 2000) {
        alert("This exceeds your paycheck budget.")
      } else {
        event.preventDefault();
        event.target.appendChild(document.getElementById(data));
  
        //updates the remaining paycheck
        totalBudget.innerText = budgetLeft;
  
        //updates the wants total
        wantsTotal.innerText = wantsUpdateText;
  
        //updates the wants percentage
        const wantsPercent = document.getElementById('wants-percent');
        const budgetPercent = (wantsUpdate / 2000) * 100;
        wantsPercent.innerText = budgetPercent;

        //adds wants as a class
        const elementId = `bill_${source.toLowerCase()}`;
        const droppedElement = document.getElementById(elementId);
        droppedElement.classList.add("wants");
      } 
  }

  checkAnswer()
}

//This function handles when an item is dropped back in the purchases section to add it back to the total budget
function dropAdd(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const source = data.replace('bill_', '');
  const droppedBill = moneyThings.find(bill => bill.source.toLowerCase() === source);
  event.target.appendChild(document.getElementById(data));
  const payment = droppedBill.cost;
  const totalBudget = document.getElementById('budget-left');
  const budgetContent = totalBudget.textContent;
  const budget = parseInt(budgetContent, 10);
  const budgetLeft = budget + payment;
  totalBudget.innerText = budgetLeft;

  // Get the class of the event item
  const elementId = `bill_${source.toLowerCase()}`;
  const droppedElement = document.getElementById(elementId);
  const eventItemClass = droppedElement.classList;

  if (eventItemClass == "needs") {
    //identifies and updates needs total
    let needsTotal = document.getElementById('needs-total');
    const needsTotalText = needsTotal.innerText
    const needsTotalNumber = parseInt(needsTotalText, 10);
    const needsUpdate = needsTotalNumber - payment;
    const needsUpdateText = String(needsUpdate);
    needsTotal.innerText = needsUpdateText;
  
    //updates the needs percentage
    const needsPercent = document.getElementById('needs-percent');
    const budgetPercent = (needsUpdate / 2000) * 100;
    needsPercent.innerText = budgetPercent;

    droppedElement.classList.remove("needs");

  
  } else if (eventItemClass == "wants") {
      //identifies and updates the wants total
      let wantsTotal = document.getElementById('wants-total');
      const wantsTotalText = wantsTotal.innerText
      const wantsTotalNumber = parseInt(wantsTotalText);
      const wantsUpdate = wantsTotalNumber - payment;
      const wantsUpdateText = String(wantsUpdate);
      wantsTotal.innerText = wantsUpdateText;
    
      //updates the wants percentage
      const wantsPercent = document.getElementById('wants-percent');
      const wantsBudgetPercent = (wantsUpdate / 2000) * 100;
      wantsPercent.innerText = wantsBudgetPercent;

      droppedElement.classList.remove("wants");

  } else {
  }

  checkAnswer()
}

//This function changes the class name if purchase is moved between needs and wants
function className(event) {
  const data = event.dataTransfer.getData("text");
  const source = data.replace('bill_', '');
  const droppedBill = moneyThings.find(bill => bill.source.toLowerCase() === source);
  const payment = droppedBill.cost;
  const elementId = `bill_${source.toLowerCase()}`;
  const droppedElement = document.getElementById(elementId);
  const eventItemClass = droppedElement.classList;
  
  if (eventItemClass == "needs") {
    //identifies and updates needs total
    let needsTotal = document.getElementById('needs-total');
    const needsTotalText = needsTotal.innerText
    const needsTotalNumber = parseInt(needsTotalText, 10);
    const needsUpdate = needsTotalNumber - payment;
    const needsUpdateText = String(needsUpdate);
    needsTotal.innerText = needsUpdateText;

    //updates the needs percentage
    const needsPercent = document.getElementById('needs-percent');
    const budgetPercent = (needsUpdate / 2000) * 100;
    needsPercent.innerText = budgetPercent;

    droppedElement.classList.remove("needs");


  } else if (eventItemClass == "wants") {
      //identifies and updates the wants total
      let wantsTotal = document.getElementById('wants-total');
      const wantsTotalText = wantsTotal.innerText
      const wantsTotalNumber = parseInt(wantsTotalText);
      const wantsUpdate = wantsTotalNumber - payment;
      const wantsUpdateText = String(wantsUpdate);
      wantsTotal.innerText = wantsUpdateText;

      //updates the wants percentage
      const wantsPercent = document.getElementById('wants-percent');
      const wantsBudgetPercent = (wantsUpdate / 2000) * 100;
      wantsPercent.innerText = wantsBudgetPercent;

      droppedElement.classList.remove("wants");

  } else {
  }
}

function handleDrop(event) {
  className(event)
  dropSubtract(event)
}


//Add 50 to savings

function addFifty() {
  //identifies the savings total
  let savingsTotal = document.getElementById('savings-total');
  const savingsTotalText = savingsTotal.innerText
  const savingsTotalNumber = parseInt(savingsTotalText);

  //adds 50
  const savingsUpdate = savingsTotalNumber + 50;
  const savingsUpdateText = String(savingsUpdate);


  //shows subtract button if total is greater than 0
  if (savingsUpdate > 0 && savingsUpdate <= 2000) {
    const btnSubtract = document.getElementById("subtract-savings");
    btnSubtract.style.display = "block";

    // Update the savings total in the HTML
    savingsTotal.innerText = savingsUpdateText;

    //Update the savings percent
    const savingsPercent = document.getElementById('savings-percent');
    const budgetPercent = (savingsUpdate / 2000) * 100;
    savingsPercent.innerText = budgetPercent;
  } else if (savingsUpdate > 2000) {
    alert("This exceeds your paycheck budget.")
  } else {
  }

  //ISA calculation
  const isaTotalHTML = document.getElementById("isa-total")
  const isaTotal = isaTotalHTML.innerText
  const isaNumber = parseInt(isaTotal)

  const isaUpdate = savingsUpdate * 1.25
  isaTotalHTML.innerText = isaUpdate
}

function addTurns() {
  addFifty();
  numberOfTurns()
}

function addFiftyButton() {
  const btnPlus = document.getElementById("add-savings");
  btnPlus.addEventListener("click", addTurns);
}

addFiftyButton()

//Subtract 50 to savings

function subtractFifty() {
  //identifies the savings total
  let savingsTotal = document.getElementById('savings-total');
  const savingsTotalText = savingsTotal.innerText
  const savingsTotalNumber = parseInt(savingsTotalText);

  //subtracts 50
  const savingsUpdate = savingsTotalNumber - 50;
  const savingsUpdateText = String(savingsUpdate);

  //Update the savings percent
  const savingsPercent = document.getElementById('savings-percent');
  const budgetPercent = (savingsUpdate / 2000) * 100;
  savingsPercent.innerText = budgetPercent;

  if (savingsTotalText > 0) {
    // Update the savings total in the HTML
    savingsTotal.innerText = savingsUpdateText;
  } else {
  }

  if (savingsUpdate === 0) {
    const btnSubtract = document.getElementById("subtract-savings");
    btnSubtract.style.display = "none";
  } else {
  }

  //ISA calculation
  const isaTotalHTML = document.getElementById("isa-total")
  const isaTotal = isaTotalHTML.innerText
  const isaNumber = parseInt(isaTotal)
  const isaUpdate = savingsUpdate * 1.25
  isaTotalHTML.innerText = isaUpdate
}

function subtractTurns() {
  subtractFifty();
  numberOfTurns()
}

function subtractFiftyButton() {
  const btnMinus = document.getElementById("subtract-savings");
  btnMinus.addEventListener("click", subtractTurns);
}

subtractFiftyButton()

//calculate number of paychecks

function numberOfTurns() {
  let savingsTotal = document.getElementById('savings-total');
  const totalTurns = document.getElementById("turns")
  const savingsTotalText = savingsTotal.innerText
  const savingsTotalNumber = parseInt(savingsTotalText);
  const isaTotalHTML = document.getElementById("isa-total")
  const isaTotal = isaTotalHTML.innerText
  const isaNumber = parseInt(isaTotal)
  const btnLifetime = document.getElementById("isa-btn");
  const btnLifetimeText = btnLifetime.innerText;
  if (btnLifetimeText == "Cancel Lifetime ISA") {
    const isaTurns = Math.ceil(5000 / isaNumber)
    const isaTurnsText = String(isaTurns);
    totalTurns.innerText = isaTurnsText;
  } else {
    const turns = Math.ceil(5000 / savingsTotalNumber);
    const turnsText = String(turns);
    totalTurns.innerText = turnsText;
  }
}

//Lifetime ISA button

function isaShowText() {
  const isaText = document.getElementById("savings-isa")
  const isaTotalHTML = document.getElementById("isa-total")
  const isaTotal = isaTotalHTML.innerText
  const isaNumber = parseInt(isaTotal)
  const savingsTotal = parseInt(document.getElementById("savings-total").innerText)
  const btnLifetime = document.getElementById("isa-btn");
  const btnLifetimeText = btnLifetime.innerText;
  if (btnLifetimeText == "Sign up for a Lifetime ISA") {
    isaText.style.display = "block";
    btnLifetime.innerText = "Cancel Lifetime ISA";
    const isaSavings = savingsTotal * 1.25;
    isaTotalHTML.innerText = isaSavings
  } else {
    isaText.style.display = "none";
    btnLifetime.innerText = "Sign up for a Lifetime ISA";
  }
  numberOfTurns()
}

function handleLifetimeButton() {
  const btnLifetime = document.getElementById("isa-btn");
  btnLifetime.addEventListener("click", isaShowText);
}

handleLifetimeButton()

//in progress

function checkAnswer() {
  const needs = document.getElementById("needs-percent");
  const wants = document.getElementById("wants-percent");
  const savings = document.getElementById("savings-percent");
  const turns = document.getElementById("turns");

  if (needs.innerText == "5" && wants.innerText == "5" && savings.innerText == "0" && turns.innerText == "10") {
    console.log("you did it!")
  } else {
  }
}

// IANA'S FUNCTIONS