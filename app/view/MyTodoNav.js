
Ext.define( 'MobileClient.view.MyTodoNav', {
  extend: 'MobileClient.view.TodoNav',
  requires: [ 'MobileClient.store.MyTodos' ],

  xtype: 'myTodoNav',

  config : {
    items : [ {
      xtype: 'todoList',
      store: 'MyTodos'
    } ]
  }
});
