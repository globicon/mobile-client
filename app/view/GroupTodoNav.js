Ext.define( 'MobileClient.view.GroupTodoNav', {
  extend: 'MobileClient.view.TodoNav',
  requires: [ 'MobileClient.store.GroupTodos' ],

  xtype: 'groupTodoNav',

  config : {
    items : [ {
      xtype: 'todoList',
      store: 'GroupTodos'
    }]
  }
});