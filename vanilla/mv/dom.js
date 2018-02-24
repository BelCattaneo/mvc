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
  