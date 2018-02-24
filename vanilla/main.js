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

function $(id){
  return document.getElementById(id);
}  

function main(){
  const addButton = $("add");
  const todoesDiv = $("todoes");
  const input = $("todo-text");
  const noItemsMessage = $("no-items-message");
  const filtersDiv = $("filters");
  const itemCount = $("item-count");

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

      addClass(todoDiv, "todo-item");
      addClass(a, "undone");
      addClass(x, "cruz");

      todoDiv.appendChild(a);
      todoDiv.appendChild(x);
      todoesDiv.appendChild(todoDiv);
    
      input.value = "";
    }
    refreshFilter();
  }

  function inputEnter(event){
    if (event.keyCode === 13) {
      addButtonOnClick();
    }
  }
  
  function todoesDivOnClick(event){
    if(hasClass(event.target, "cruz")){
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
        removeClass($(selectedFilter), "selected-filter");
      }
      //Sets the selected-filter class
      addClass(clickedFilter, "selected-filter");
      filterClick(clickedFilter.id);
    }
  }

  function filterClick(filterId){
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

  function hideTodoes(){
    for (var a = 0; a < todoesDiv.children.length; a++) {
      addClass(todoesDiv.children[a], "hidden");
    }
  }

  function showTodoes(filterId){
    if (filterId === "all") {
      const allTodoes = todoesDiv.children;
      for (var a = 0; a < allTodoes.length; a++) {
        removeClass(allTodoes[a], "hidden");
      }
    }
    const filteredTodoes = todoesDiv.getElementsByClassName(filterId);
    if (filteredTodoes.length) {
      for (var a = 0; a < filteredTodoes.length; a++) {
        removeClass(filteredTodoes[a].parentNode, "hidden");
      }
    }
  }

  function doneFilter(){
    selectedFilter = "done-filter";
    hideTodoes();
    showTodoes("done");
    shownItemsCount("done");
  }
  
  function undoneFilter(){
    selectedFilter = "undone-filter";
    hideTodoes();
    showTodoes("undone");
    shownItemsCount("undone");
  }
  
  function allFilter(){
    selectedFilter = "all-filter"
    showTodoes("all");
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

    itemCount.children[0].innerHTML = shownItems + " Items";
  }

  listen(addButton, "click", addButtonOnClick);
  listen(todoesDiv, "click", todoesDivOnClick);
  listen(input, "keyup", inputEnter);
  listen(filtersDiv, "click", filtersDivOnClick);
}


document.addEventListener("DOMContentLoaded", main);
