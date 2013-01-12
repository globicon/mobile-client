Ext.define('MobileClient.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
  ],
  config: {
    tabBarPosition: 'bottom',

    items: [
    {
      title: 'My Todos',
      iconCls: 'user',

      styleHtmlContent: true,
      scrollable: true,

      items: {
        docked: 'top',
        xtype: 'titlebar',
        title: 'My Todos'
      }
    },
    {
      title: 'Group Todos',
      iconCls: 'team1',

      items: [
      {
        docked: 'top',
        xtype: 'titlebar',
        title: 'Group Todos'
      }
      ]
    },
    {
      title: 'Search',
      iconCls: 'search',

      items: [
      {
        docked: 'top',
        xtype: 'titlebar',
        title: 'Search'
      }
      ]
    }
    ]
  }
});
