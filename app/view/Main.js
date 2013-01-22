Ext.define('MobileClient.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'MobileClient.view.TodoNav',
    'MobileClient.view.Settings'
  ],
  config: {
    tabBarPosition: 'bottom',
    layout: {
      animation: false
    },

    items: [
    {
      title: 'My Todos',
      iconCls: 'user',
      xtype : 'todonav',
      items : [ {
        xtype: 'todoList',
        store: 'MyTodos',
        title: 'My Todos'
      }]
    },
    {
      title: 'Group Todos',
      iconCls: 'team1',
      xtype : 'todonav',
      items : [{
        xtype: 'todoList',
        store : 'MyTodos',
        title : 'Group Todo'
      }]
    },
    {
      title: 'Search Todos',
      iconCls: 'search'
    },
    {
      title : 'Account',
      iconCls : 'settings',
      xtype : 'settings'
    }
    ]
  }
});
