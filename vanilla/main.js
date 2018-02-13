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
  const input = document.getElementById("todo-text");
  
  function addButtonOnClick(){  
    const todo = document.getElementById("todo-text").value;
    if (todo != "") {
      const todoDiv = document.createElement("div");
      const a = document.createElement("a");
      const x = document.createElement("a");
      
      x.textContent = "x";
      a.textContent = todo;
      a.classList.add("undone");
    
      todoDiv.appendChild(a);
      todoDiv.appendChild(x);
      todoesDiv.appendChild(todoDiv);
    
      document.getElementById("todo-text").value = "";
    }
  } 
  
  function todoesDivOnClick(event){
    if(event.target.innerHTML === "x"){
      return event.target.parentNode.remove();  
    }

    if(event.target.nodeName === "A"){
      const a = event.target;
      if(isDone(a)){
        a.classList.add("undone");
        a.classList.remove("done");
      } else {
        a.classList.add("done");
        a.classList.remove("undone");
      }
    }
  } 

  function showTodoes(){
    for (var a = 0; a < todoesDiv.children.length; a++) {
      todoesDiv.children[a].removeAttribute("hidden", true);
      
    }
  }

  function doneFilterOnClick(){
    showTodoes();

    const doneTodoes = todoesDiv.getElementsByClassName("undone");
    if (doneTodoes.length) {
      for (var a = 0; a < doneTodoes.length; a++) {
        doneTodoes[a].parentNode.setAttribute("hidden", true);
        
      }
    }
  }
  
  function undoneFilterOnClick(){
    showTodoes();

    const undoneTodoes = todoesDiv.getElementsByClassName("done");
    if (undoneTodoes.length) {
      for (var a = 0; a < undoneTodoes.length; a++) {
        undoneTodoes[a].parentNode.setAttribute("hidden", true);
        
      }
    }
  }

  function inputEnter(event){
    if (event.keyCode === 13) {
      addButton.click();
    }
  }

  listen(addButton, "click", addButtonOnClick);
  listen(todoesDiv, "click", todoesDivOnClick);
  listen(doneFilter, "click", doneFilterOnClick);  
  listen(undoneFilter, "click", undoneFilterOnClick);
  listen(allFilter, "click", showTodoes);
  listen(input, "keyup", inputEnter)
}


document.addEventListener("DOMContentLoaded", main);
