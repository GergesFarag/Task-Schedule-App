let inputField = document.querySelector("#txtinput"); 
let addBtn = document.querySelector("#addbtn") ;
let container = document.querySelector(".task-container");
let taskList = document.querySelector("#task-list"); 
let arrOfTasks = [];
let percentDiv = document.querySelector(".progress");
let doneCounter;
let percentQuote = document.querySelector(".progressMSG");
if(window.localStorage.getItem("tasks")){
    arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getFromLS();
addBtn.onclick = function(){
    if(inputField.value !== ""){
        addTasksToList(inputField.value);    
        inputField.value = "";
    }
}
if(window.localStorage.getItem("counter")){
    doneCounter = window.localStorage.getItem("counter");
    if(doneCounter == 0){
        percentDiv.textContent = `0%`;    
        DrawQuote(0 ,percentQuote);
    }else{
        percentDiv.textContent = `${(doneCounter / arrOfTasks.length * 100).toFixed()}%`;
        DrawQuote((doneCounter / arrOfTasks.length * 100).toFixed(),percentQuote);
    }
}
else{
     doneCounter = 0;
}
//click on delete button
taskList.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.parentElement.remove();
        removeFromList(e.target.parentElement.parentElement.getAttribute("data-id"));
        if(e.target.parentElement.parentElement.classList.contains("done-task")){
            if(arrOfTasks.length != 0)
            doneCounter--;
        }
        window.localStorage.setItem("counter" , doneCounter);
        if(doneCounter == 0){
            percentDiv.textContent = `0%`;   
            DrawQuote(0,percentQuote); 
        }else{
            percentDiv.textContent = `${(doneCounter / arrOfTasks.length * 100).toFixed()}%`
            DrawQuote((doneCounter / arrOfTasks.length * 100).toFixed(),percentQuote);
        }
    }
    if(e.target.classList.contains("done")){
        e.target.parentElement.parentElement.classList.toggle("done-task");
        toggleStatusOfTask(e.target.parentElement.parentElement.getAttribute("data-id"));
    }
})

function toggleStatusOfTask(id){
    for(let i=0; i<arrOfTasks.length; i++){
        if(arrOfTasks[i].id == id){
            if(arrOfTasks[i].completed == false){
                arrOfTasks[i].completed = true;
                doneCounter++;
                window.localStorage.setItem("counter" , doneCounter);
                percentDiv.textContent = `${(doneCounter / arrOfTasks.length * 100).toFixed()}%`
                DrawQuote((doneCounter / arrOfTasks.length * 100).toFixed(),percentQuote);
            }else{
                arrOfTasks[i].completed = false;
                doneCounter--;
                window.localStorage.setItem("counter" , doneCounter);
                percentDiv.textContent = `${(doneCounter / arrOfTasks.length * 100).toFixed()}%`
                DrawQuote((doneCounter / arrOfTasks.length * 100).toFixed(),percentQuote);
            }
            break;
        }
    }
    addToLS(arrOfTasks);
}
function removeFromList(id){
    arrOfTasks = arrOfTasks.filter((task) => task.id != id);
    if(arrOfTasks.length == 0){
        doneCounter = 0;
        DrawQuote(0,percentQuote); 
    }
    addToLS(arrOfTasks);
}
function addTasksToList(taskText){
    let task = {
        id: Date.now(),
        title: taskText,
        completed : false
    };
    arrOfTasks.push(task);
    addElementsToPageFromArr(arrOfTasks);
    addToLS(arrOfTasks);
    percentDiv.textContent = `${(doneCounter / arrOfTasks.length * 100).toFixed()}%`
    DrawQuote((doneCounter / arrOfTasks.length * 100).toFixed(),percentQuote);
}

function addElementsToPageFromArr(arrOfTasks){
    taskList.innerHTML = "";
    arrOfTasks.forEach(task => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task.title));
        li.className = "task";
        li.setAttribute("data-id" , task.id);
        let deleteBtn = document.createElement("span");
        let doneBtn = document.createElement("span");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        doneBtn.appendChild(document.createTextNode("Done"));
        deleteBtn.className = "delete";
        doneBtn.className = "done";
        let rightContent = document.createElement("div");
        rightContent.className = "right-content";
        rightContent.appendChild(deleteBtn);
        rightContent.appendChild(doneBtn);
        li.appendChild(rightContent);
        if(task.completed){
            li.classList.add("done-task");
        }
        taskList.appendChild(li);
    });
}

function addToLS(arrOfTasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arrOfTasks));
}

function getFromLS(){
  let data =  window.localStorage.getItem("tasks");
  if(data){
    let tasks = JSON.parse(data);
    addElementsToPageFromArr(tasks);
  }
}
function DrawQuote(percentage , div) {
    let divContent;
    if (percentage == 0) {
        divContent = "Can't Wait For Achievements !";
    } else if (percentage > 0 && percentage <= 30) {
        divContent = "Awesome, Keep Going Ahead!";
    } else if (percentage > 30 && percentage <= 50) {
        divContent = "You're About The Half Of The Day, Continue !";
    } else if (percentage > 50 && percentage <= 80) {
        divContent = "Great Job, You Finished More Than The Half !";
    } else if (percentage > 80 && percentage <= 99) {
        divContent = "You're About To Finish The Day, Focus !";
    } else if (percentage == 100) {
        divContent = "Congratulations, You Have Finished The Goal Of The Day :)";
    } else {
        divContent = "Invalid percentage!";
    }
    div.textContent = divContent;
}
