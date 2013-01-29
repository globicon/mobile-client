(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Actions', {
    extend: 'Ext.SegmentedButton',

    xtype: 'actions',

    config : {
      style: 'margin: 10px auto;',
      layout: {
        pack: 'center'
      },
      items : [
      {
        iconCls: 'reply',
        iconMask: true,
        text: 'Comment',
      },
      {
        iconCls: 'check1',
        iconMask: true,
        text: 'Resolve',
      }]
    }
  });
} )( window.Ext );