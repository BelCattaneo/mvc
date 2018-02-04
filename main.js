function main(){
  const button = document.getElementById("add");
  
  button.addEventListener("click", function(){  
    const todo = document.getElementById("todo-text").value;
    console.log(todo);
  });
}

document.addEventListener("DOMContentLoaded", main);
