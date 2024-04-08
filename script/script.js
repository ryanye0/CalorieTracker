let daysOfTheWeek = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`]


function runProgram() {
    createAllInputs()

    getHTMLElements()
}
let calGoalBtn
let calGoalInput
let calGoal = 0
let totalCal = {"Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0, "Sunday": 0} 

function getHTMLElements(){
    calGoalBtn = document.querySelector('.submitButton');
    calGoalInput = document.querySelector("#goalCals")
    calGoalBtn.addEventListener("click", addCalGoal)
}

function addItem(calorieInput,itemInput, ul, dayOfTheWeek, calCounter, calGoalProgress){
    let item = itemInput.value;
    let calories = Number(calorieInput.value);  
    if(item !== "" && calories !== "" && !Number.isNaN(calories)){  
        const newDiv = document.createElement("div")
        const newItem = document.createElement("span")
        const newBtn = document.createElement("button")
        
        newDiv.classList.add(".item")

        newItem.textContent = `${item}: ${calories}`

        newBtn.textContent = `x`      
        newBtn.classList.add(".xButton")
        newBtn.addEventListener("click", displayPopup.bind(null,calGoalProgress, calories, calCounter, dayOfTheWeek, newDiv))

        
        newDiv.appendChild(newItem)
        newDiv.appendChild(newBtn)
        ul.appendChild(newDiv)

        totalCal[`${dayOfTheWeek}`] += calories 
        updateTotalCals(calCounter, dayOfTheWeek)
        if(calGoal !== 0){
            updateCalGoal(calGoalProgress, dayOfTheWeek)
        }
    }
}
function deleteItem(calGoalProgress, caloriesAdded, calCounter, dayOfTheWeek, item){
    
    item.remove()

    totalCal[`${dayOfTheWeek}`] -= caloriesAdded
    updateTotalCals(calCounter, dayOfTheWeek)
    if(calGoal !== 0){
        updateCalGoal(calGoalProgress, dayOfTheWeek)
    }
    
}

function displayPopup(calGoalProgress, calories, calCounter, dayOfTheWeek, newDiv){

    if(confirm("Delete Item?")){
        deleteItem(calGoalProgress, calories, calCounter, dayOfTheWeek, newDiv)
    } else{
       return null 
    }
}

function addCalGoal(){
    if(calGoalInput !== ""){
        let NaNCheck = Number(calGoalInput.value)
        if(!Number.isNaN(NaNCheck)){
            calGoal = NaNCheck
            let calorieGoals = document.querySelectorAll(".calGoals")
            for(let i = 0; i < calorieGoals.length; i++){
            calorieGoals[i].textContent = `Cals till goal: ` +  (calGoal - totalCal[`${daysOfTheWeek[i]}`])
             }
        }
    }
}

function updateTotalCals(calCounter, dayOfTheWeek){
    calCounter.textContent = `Total Calories: ` + totalCal[`${dayOfTheWeek}`]
}
function updateCalGoal(calGoalProgress, dayOfTheWeek){
    calGoalProgress.textContent = `Cals till goal: ` +  (calGoal - totalCal[`${dayOfTheWeek}`])
}

function createInputs(dayOfTheWeekDiv, dayOfTheWeek){
    const newHeader = document.createElement("h1")
    const newItemInput = document.createElement("input")
    const newCalorieInput = document.createElement("input")
    const newAddButton = document.createElement("button")
    const newUl = document.createElement("ul")
    const calCounter = document.createElement("li")
    const calGoalProgress = document.createElement("li");

    newHeader.textContent = dayOfTheWeek
    newHeader.classList.add("header")

    newItemInput.setAttribute('type', "text")
    newItemInput.placeholder = "Enter Item"

    newCalorieInput.setAttribute('type', "text")
    newCalorieInput.placeholder = "Enter Calories"

    newAddButton.setAttribute('type', "submit")
    newAddButton.textContent = "Add"
    newAddButton.addEventListener('click', addItem.bind(null, newCalorieInput, newItemInput, newUl, dayOfTheWeek, calCounter, calGoalProgress))

    calCounter.textContent = "Total Calories: 0";
    calCounter.classList.add("noDot")

    calGoalProgress.classList.add("noDot");
    calGoalProgress.classList.add("calGoals")

    
    dayOfTheWeekDiv.appendChild(newHeader)
    dayOfTheWeekDiv.appendChild(newItemInput)
    dayOfTheWeekDiv.appendChild(newCalorieInput)
    dayOfTheWeekDiv.appendChild(newAddButton)
    dayOfTheWeekDiv.appendChild(calCounter)
    dayOfTheWeekDiv.appendChild(calGoalProgress)
    dayOfTheWeekDiv.appendChild(newUl)
}


function createAllInputs(){
    for(let i = 0; i < daysOfTheWeek.length; i++){
        let dayOfTheWeekDiv = document.querySelector(`#${daysOfTheWeek[i]}`)
        createInputs(dayOfTheWeekDiv, daysOfTheWeek[i] )
    }
}
document.addEventListener('DOMContentLoaded', runProgram);
