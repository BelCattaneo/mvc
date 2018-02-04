function main(){
  const addButton = document.getElementById("add");
  const todoesDiv = document.getElementById("todoes");

  addButton.addEventListener("click", function(){  
    const todo = document.getElementById("todo-text").value;
    
    const p = document.createElement("p");
    p.textContent = todo;
    todoesDiv.appendChild(p);
  });
}

document.addEventListener("DOMContentLoaded", main);
