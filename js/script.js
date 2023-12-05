var input = document.getElementById("txtinput");
var btn = document.getElementById("addbtn");
var list = document.getElementById("task-list");
function addTask(){
    if(input.value == ""){
        alert("Please Enter a Task");
    }else{
        let task = document.createElement("li");
        task.innerHTML = input.value;
        list.appendChild(task);
        input.value = '';
        var del = document.createElement("span");
        del.innerHTML = "&times;";
        task.appendChild(del);
    }
}
btn.addEventListener("click" , addTask);
list.addEventListener("click" , function(l){
    if(l.target.nodeName === "LI"){
        l.target.classList.toggle("checked");
    }else if(l.target.nodeName === "SPAN"){
        l.target.parentElement.remove();
    }
} , false);