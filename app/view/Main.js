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
        items: [
        {
          xtype: 'button',
          iconCls : 'settings',
          handler: function() {
            this.up( 'main' ).fireEvent( 'settings' );
          }
        },
        {
          xtype: 'spacer'
        },
        {
          xtype: 'button',
          text: 'New',
          align: 'right',
          handler: function() {
            this.up( 'main' ).fireEvent( 'new' );
          }
        }]
      },
      {
        title: 'My Cases',
        iconCls: 'star',
        xtype: 'todoList',
        store: 'Interactions'
      },
      {
        title: 'My Todos',
        iconCls: 'user',
        xtype: 'todoList',
        store: 'MyTodos'
      },
      {
        title: 'Group Todos',
        iconCls: 'team',
        xtype : 'todoList',
        store : 'GroupTodos'
      },
      {
        title: 'My Approvals',
        iconCls: 'check2',
        xtype: 'todoList',
        store: 'Approvals'
      },
      {
        title: 'Search',
        iconCls: 'search',
        xtype: 'search'
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
