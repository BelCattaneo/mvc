const bus = {
  tasks : {},
  emit : function(eventName){
    this.tasks[eventName]();
  },
  listen : function(eventName, cb){
    this.tasks[eventName] = cb;
  }
}; 

