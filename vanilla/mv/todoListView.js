function todoListView(){
  const todoesDiv = $("todoes");
  const noItemsMessage = $("no-items-message");
  const filtersDiv = $("filters");
  const itemCount = $("item-count");

  var selectedFilter = "";
  var shownItems = 0;
  var totalItems = 0;

  
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
    refreshTodoesList();
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
      applyFilter(clickedFilter.id);
    }
  }

  function applyFilter(filterId){
    selectedFilter = filterId;
    filterTodoes(filterId.split("-")[0]);
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
  
  function filterTodoes(todoStatus){
    hideTodoes();
    showTodoes(todoStatus);
    shownItemsCount(todoStatus);
  }

  function refreshTodoesList(){
    if(selectedFilter){
      applyFilter(selectedFilter);
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

  listen(todoesDiv, "click", todoesDivOnClick);
  listen(filtersDiv, "click", filtersDivOnClick);
  
  bus.listen("newTodo", refreshTodoesList);
}