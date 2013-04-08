(function( Ext ) {
  'use strict';

  Ext.define('MobileClient.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
      'MobileClient.view.TodoList',
      'MobileClient.view.Search',
      'MobileClient.view.Settings'
    ],
    config: {
      tabBarPosition: 'bottom',
      layout: {
        animation: false
      },
      items: [{
        docked: 'top',
        itemId: 'toolbar',
        xtype: 'toolbar',
        title: 'My Todos',
        ui: 'light',
        layout: {
          pack: 'right'
        },
        items: [{
          xtype: 'button',
          text: 'New',
          handler: function() {
            this.up( 'main' ).fireEvent( 'new' );
          }
        }]
      },
      {
        title: 'My Todos',
        iconCls: 'user',
        xtype: 'todoList',
        store: 'MyTodos'
      },
      {
        title: 'Group Todos',
        iconCls: 'team1',
        xtype : 'todoList',
        store : 'GroupTodos'
      },
      {
        title: 'My Approvals',
        iconCls: 'check1',
        xtype: 'todoList',
        store: 'Approvals'
      },
      {
        title: 'Search',
        iconCls: 'search',
        xtype: 'search'
      },
      {
        title : 'Account',
        iconCls : 'settings',
        xtype : 'settings'
      }],

      listeners: {
        activeitemchange : function( container, value ) {
          var toolbar = this.getComponent( 'toolbar' );
          toolbar.setTitle( value.title );
        }
      }
    }
  });
})( window.Ext );
