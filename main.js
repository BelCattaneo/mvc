function main(){
  const button = document.getElementById("add");
  
  button.addEventListener("click", function(){
    console.log("Holo!");
  });
}

document.addEventListener("DOMContentLoaded", main);
