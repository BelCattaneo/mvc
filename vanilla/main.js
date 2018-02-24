function listen(element, eventName, callback){
  element.addEventListener(eventName, callback);
}

function isDone(element){
  return element.classList.contains("done");
}

function hide(element){
  element.classList.add("hidden");
}

function show(element){
  element.classList.remove("hidden");
}

function hasClass(element, className){
  return element.classList.contains(className);
}

function addClass(element, className){
  element.classList.add(className);
}

function removeClass(element, className){
  element.classList.remove(className);
}


function main(){
  const addButton = document.getElementById("add");
  const todoesDiv = document.getElementById("todoes");
  const input = document.getElementById("todo-text");
  const noItemsMessage = document.getElementById("no-items-message");
  const filtersDiv = document.getElementById("filters");
  const itemCount = document.getElementById("item-count");

  var selectedFilter = "";
  var shownItems = 0;
  var totalItems = 0;

  function addButtonOnClick(){  
    const todo = input.value;
    if (todo != "") {
      const todoDiv = document.createElement("div");
      const a = document.createElement("a");
      const x = document.createElement("a");
      
      x.textContent = "x";
      a.textContent = todo;
      addClass(a, "undone");
    
      todoDiv.appendChild(a);
      todoDiv.appendChild(x);
      todoesDiv.appendChild(todoDiv);
    
      input.value = "";
    }
    refreshFilter();
  }

  function inputEnter(event){
    if (event.keyCode === 13) {
      addButton.click();
    }
  }
  
  function todoesDivOnClick(event){
    if(event.target.innerHTML === "x"){
      event.target.parentNode.remove();  
    }
    if(event.target.nodeName === "A"){
      const a = event.target;
      if(isDone(a)){
        addClass(a, "undone");
        removeClass(a, "done");
      } else {
        addClass(a, "done");
        removeClass(a, "undone");
      }
    }
    refreshFilter();
  } 

  function filtersDivOnClick(event){
    var clickedFilter = event.target;
    if (selectedFilter === clickedFilter) {
      //If selected filter and clicked filter are equal it finishes.
      return;
    } else {
      //If selectedFilters is set it removes the selected-filter class
      if(selectedFilter){
        removeClass(document.getElementById(selectedFilter), "selected-filter");
      }
      //Sets the selected-filter class
      addClass(clickedFilter, "selected-filter");
      filterClick(clickedFilter.id);
    }
  }

  filterClick = function(filterId){
    switch (filterId) {
      case "done-filter":
      doneFilter();
      break;
      
      case "undone-filter":
      undoneFilter();
      break;
      
      case "all-filter":
      allFilter();
      break;
    }
  }

  function showTodoes(){
    for (var a = 0; a < todoesDiv.children.length; a++) {
      removeClass(todoesDiv.children[a], "hidden");
    }
  }

  function hideTodoes(filterId){
    const filtederTodoes = todoesDiv.getElementsByClassName(filterId);
    if (filtederTodoes.length) {
      for (var a = 0; a < filtederTodoes.length; a++) {
        addClass(filtederTodoes[a].parentNode, "hidden");
      }
    }
  }

  function doneFilter(){
    selectedFilter = "done-filter";
    showTodoes();
    hideTodoes("undone");
    shownItemsCount("done");
  }
  
  function undoneFilter(){
    selectedFilter = "undone-filter";
    showTodoes();
    hideTodoes("done");
    shownItemsCount("undone");
  }
  
  function allFilter(){
    selectedFilter = "all-filter"
    showTodoes();
    shownItemsCount("all");
  }

  function refreshFilter(){
    if(selectedFilter){
      filterClick(selectedFilter);
    } else {
      shownItemsCount("all");
    }
  }

  function countItems(classItems){
    shownItems = 0;
    totalItems = todoesDiv.childElementCount;
    if (classItems  === "all") {
      shownItems = totalItems;
    } else {
      for (let i = 0; i < totalItems; i++) {
        if (hasClass(todoesDiv.children[i].children[0], classItems)) {
          shownItems++;
        }
      }
    }
  }

  function shownItemsCount(classItems){
    itemCount.children[0].innerHTML = "";
    countItems(classItems);
    
    if (shownItems === 0) {
      show(noItemsMessage);
    
    } else {
      if (!hasClass(noItemsMessage, "hidden")) {
        hide(noItemsMessage);
      }
    }

    itemCount.children[0].innerHTML = shownItems + " Items for the selected filter";
  }

  listen(addButton, "click", addButtonOnClick);
  listen(todoesDiv, "click", todoesDivOnClick);
  listen(input, "keyup", inputEnter);
  listen(filtersDiv, "click", filtersDivOnClick);
}


document.addEventListener("DOMContentLoaded", main);
