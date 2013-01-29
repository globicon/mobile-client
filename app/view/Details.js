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

      items: [
      {
        xtype: 'summary',
        id: 'summary'
      },
      {
        xtype: 'actions',
        id: 'actions',
        hidden: true
      },
      {
        xtype : 'history',
        id : 'history' }
      ]
    },

    initialize : function() {
      var model = this.getModel(),
          that = this;

      if ( !model ) {
        return;
      }

      model.on( { 'loaded' : function() {
        that.items.get( 'summary' ).setData( model.getData() );
        that.items.get( 'history' ).setData( model.getHistoryData() );
        that.items.get( 'actions' ).show();
      } } );
    }
  });
} )( window.Ext );