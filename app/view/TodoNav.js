(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.TodoNav', {
    extend: 'Ext.navigation.View',
    xtype: 'todonav',

    requires: [
      'MobileClient.view.TodoList'
    ],

    config : {
      navigationBar: {
        ui: 'light',
        items: [{
          xtype: 'button',
          text: 'New',
          align: 'right'
        }]
      }
    }
  });
} )( window.Ext );
