Ext.define('MobileClient.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'MobileClient.view.MyTodoNav',
    'MobileClient.view.GroupTodoNav'
  ],
  config: {
    tabBarPosition: 'bottom',

    items: [
    {
      title: 'My Todos',
      iconCls: 'user',
      xtype : 'myTodoNav'
    },
    {
      title: 'Group Todos',
      iconCls: 'team1',
      xtype : 'groupTodoNav'
    },
    {
      title: 'Search Todos',
      iconCls: 'search'
    }
    ]
  }
});
