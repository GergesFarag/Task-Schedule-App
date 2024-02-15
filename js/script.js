let inputField = document.querySelector("#txtinput"); 
let addBtn = document.querySelector("#addbtn") 
let taskList = document.querySelector("#task-list"); 
let arrOfTasks = [];

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
//click on delete button
taskList.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.parentElement.remove();
        removeFromList(e.target.parentElement.parentElement.getAttribute("data-id"));
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
            }else{
                arrOfTasks[i].completed = false;
            }
            break;
        }
    }
    addToLS(arrOfTasks);
}
function removeFromList(id){
    arrOfTasks = arrOfTasks.filter((task) => task.id != id);
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