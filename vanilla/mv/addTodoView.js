function addTodoView(){
  const addButton = $("add");
  const todoesDiv = $("todoes");
  const input = $("todo-text");


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
    
    bus.emit("newTodo");
  }

  function inputEnter(event){
    if (event.keyCode === 13) {
      addButtonOnClick();
    }
  }


  listen(addButton, "click", addButtonOnClick);
  listen(input, "keyup", inputEnter);
}