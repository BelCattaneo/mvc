function listen(element, eventName){

}

function isDone(element){
  return element.classList.contains("done");
}

function main(){
  const addButton = document.getElementById("add");
  const todoesDiv = document.getElementById("todoes");

  addButton.addEventListener("click", function(){  
    const todo = document.getElementById("todo-text").value;
    
    const a = document.createElement("a");
    const todoDiv = document.createElement("div");
    
    a.textContent = todo;

    todoDiv.appendChild(a);
    todoesDiv.appendChild(todoDiv);
  });

  todoesDiv.addEventListener("click", function(event){
    if(event.target.nodeName === "A"){
      const a = event.target;
      if(isDone(a)){
        a.classList.remove("done");
      } else {
        a.classList.add("done");
      }
    }

  })
}


document.addEventListener("DOMContentLoaded", main);
