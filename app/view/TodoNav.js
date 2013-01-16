Ext.define( 'MobileClient.view.TodoNav', {
  extend: 'Ext.navigation.View',
  xtype: 'todonav',

  requires: [
    'MobileClient.view.TodoList'
  ],

  config : {
    navigationBar: {
      items: [{
        xtype: 'button',
        text: 'New',
        align: 'right'
      }]
    }
  }
});