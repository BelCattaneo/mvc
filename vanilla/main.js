/*
 *
 *Agregar Cantidad de elementos que se muestran.
 */ 

function listen(element, eventName, callback){
  element.addEventListener(eventName, callback);
}

function isDone(element){
  return element.classList.contains("done");
}

function unselectFilters(){
  document.getElementById("done-filter").classList.remove("selected-filter");
  document.getElementById("undone-filter").classList.remove("selected-filter");
  document.getElementById("all-filter").classList.remove("selected-filter");
}

function hideNoItemsMessage(){
  const noItemsMessage =  document.getElementById("no-items-message");
  var isNoItemsMessageShown =  noItemsMessage.classList.contains("hidden");
  if(isNoItemsMessageShown){
    document.getElementById("no-items-message").classList.add("hidden");
  }
}




function main(){
  const addButton = document.getElementById("add");
  const todoesDiv = document.getElementById("todoes");
  const doneFilter = document.getElementById("done-filter");
  const undoneFilter = document.getElementById("undone-filter");
  const allFilter = document.getElementById("all-filter");
  const input = document.getElementById("todo-text");
  const noItemsMessage = document.getElementById("no-items-message");
  const filtersDiv = document.getElementById("filters");


  function addButtonOnClick(){  
    const todo = input.value;
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
    
      input.value = "";
    }

    refreshFilter();
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

    refreshFilter();

  } 

  function filtersDivOnClick(event){
    var currentFilter = document.getElementsByClassName("selected-filter")[0];
    var selectedFilter = event.target
    if(currentFilter){
      currentFilter.classList.remove("selected-filter");
    }
    selectedFilter.classList.add("selected-filter");
  }

  function showTodoes(){
    for (var a = 0; a < todoesDiv.children.length; a++) {
      todoesDiv.children[a].classList.remove("hidden");
    }
  }

  function doneFilterOnClick(){
    showTodoes();
    hideNoItemsMessage()

    const doneTodoes = todoesDiv.getElementsByClassName("undone");
    if (doneTodoes.length) {
      for (var a = 0; a < doneTodoes.length; a++) {
        doneTodoes[a].parentNode.classList.add("hidden");
      }
    } else {
      noItemsMessage.classList.remove("hidden");
    }
  }
  
  function undoneFilterOnClick(){
    showTodoes();
    hideNoItemsMessage()

    const undoneTodoes = todoesDiv.getElementsByClassName("done");
    if (undoneTodoes.length) {
      for (var a = 0; a < undoneTodoes.length; a++) {
        undoneTodoes[a].parentNode.classList.add("hidden");
        
      }
    } else {
      document.getElementById("no-items-message").classList.remove("hidden");
    }
  }
  
  function allFilterOnClick(){
    showTodoes();
    hideNoItemsMessage()

    const doneTodoes = todoesDiv.getElementsByClassName("done");
    const undoneTodoes = todoesDiv.getElementsByClassName("undone");
    if (doneTodoes.length === 0 && undoneTodoes.length === 0) {
      noItemsMessage.classList.add("hidden");
    }
  }

  function inputEnter(event){
    if (event.keyCode === 13) {
      addButton.click();
    }
  }

  function refreshFilter(){
    var currentFilter = document.getElementsByClassName("selected-filter")
    if(currentFilter.length != 0){
      currentFilter[0].click();
    }
  }

  listen(addButton, "click", addButtonOnClick);
  listen(todoesDiv, "click", todoesDivOnClick);
  listen(doneFilter, "click", doneFilterOnClick);  
  listen(undoneFilter, "click", undoneFilterOnClick);
  listen(allFilter, "click", allFilterOnClick);
  listen(input, "keyup", inputEnter);
  listen(filtersDiv, "click", filtersDivOnClick);
}


document.addEventListener("DOMContentLoaded", main);
