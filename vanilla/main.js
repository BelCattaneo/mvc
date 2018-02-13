function listen(element, eventName, callback){
  element.addEventListener(eventName, callback);
}

function isDone(element){
  return element.classList.contains("done");
}


function main(){
  const addButton = document.getElementById("add");
  const todoesDiv = document.getElementById("todoes");
  const doneFilter = document.getElementById("done-filter");
  const undoneFilter = document.getElementById("undone-filter");
  const allFilter = document.getElementById("all-filter");
  
  function addButtonOnClick(){  
    const todo = document.getElementById("todo-text").value;
    const todoDiv = document.createElement("div");
    const a = document.createElement("a");
    const x = document.createElement("a");
    
    x.textContent = "x";
    a.textContent = todo + " ";
    a.classList.add("undone");
  
    todoDiv.appendChild(a);
    todoDiv.appendChild(x);
    todoesDiv.appendChild(todoDiv);
  
    document.getElementById("todo-text").value = "";
  } 
  
  function todoesDivOnClick(event){
    if(event.target.innerHTML === "x"){
      return event.target.parentNode.remove();  
    }

    if(event.target.nodeName === "A"){
      const a = event.target;
      if(isDone(a)){
        a.classList.remove("done");
      } else {
        a.classList.add("done");
        a.classList.remove("undone");
      }
    }
  } 

  function doneFilterOnClick(){
    
  }
  
  listen(addButton, "click", addButtonOnClick);
  listen(todoesDiv, "click", todoesDivOnClick);
  listen(doneFilter, "click", doneFilterOnClick);  
}


document.addEventListener("DOMContentLoaded", main);
