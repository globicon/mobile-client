(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Actions', {
    extend: 'Ext.Container',

    xtype: 'actions',

    config : {
      layout: 'hbox',
      items : [
      {
        xtype: 'button',
        text: 'Comment',
        flex: 1,
        margin: 4
      },
      {
        xtype: 'button',
        text: 'Resolve',
        flex: 1,
        margin: 4
      }]
    }
  });
} )( window.Ext );