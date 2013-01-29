(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Details', {
    extend: 'Ext.Container',

    requires: [
      'MobileClient.view.Summary',
      'MobileClient.view.Actions',
      'MobileClient.view.History'
    ],

    xtype: 'details',

    config : {
      model : null,
      fullscreen: true,
      scrollable: true,
      styleHtmlContent: true,
      layout: 'vbox',
      cls: 'tight',

      items: [
      {
        xtype: 'summary',
        itemId: 'summary',
        hidden: true,
        cls: 'bordered bordered-top',
      },
      {
        xtype: 'actions',
        itemId: 'actions',
        hidden: true,
        cls: 'bordered bordered-bottom',
      },
      {
        xtype : 'history',
        itemId : 'history',
        hidden: true,
        cls: 'list bordered'
      }
      ]
    },

    initialize : function() {
      var model = this.getModel(),
          that = this;

      if ( !model ) {
        return;
      }

      model.on( { 'loaded' : function() {
        that.getComponent( 'summary' ).setData( model.getData() );
        that.getComponent( 'history' ).setData( model.getHistoryData() );
        that.getComponent( 'summary' ).show();
        that.getComponent( 'history' ).show();
        that.getComponent( 'actions' ).show();
      } } );
    }
  });
} )( window.Ext );