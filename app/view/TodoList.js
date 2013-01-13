Ext.define( 'MobileClient.view.TodoList', {
  extend: 'Ext.List',
  xtype: 'todoList',

  config : {
    itemTpl : '{title}'
  }
});