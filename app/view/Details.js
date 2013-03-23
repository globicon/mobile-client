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

      items: [{
        xtype : 'toolbar',
        docked: 'top',
        title: 'Details',
        ui: 'light',
        items : [{
          xtype: 'button',
          ui: 'back',
          text: 'Back',
          handler: function() {
            this.up( 'details' ).fireEvent( 'back' );
          }
        }],
      },
      {
        itemId: 'actionPnl',
        xtype: 'toolbar',
        docked: 'bottom',
        ui: 'light',
        items : [{
          itemId: 'commentBtn',
          xtype: 'button',
          text: 'Comment'
        },
        {
          itemId: 'resolveBtn',
          xtype: 'button',
          text: 'Resolve',
          align: 'right'
        },
        {
          xtype: 'spacer'
        },
        {
          itemId: 'closeBtn',
          xtype: 'button',
          text: 'Close',
          align: 'right'
        },
        {
          itemId: 'approveBtn',
          xtype: 'button',
          text: 'Approve',
          align: 'right'
        },
        {
          itemId: 'denyBtn',
          xtype: 'button',
          text: 'Deny',
          align: 'right'
        },
        ]
      },
      {
        xtype: 'summary',
        itemId: 'summary',
        hidden: true,
        cls: 'bordered bordered-top'
      },
      {
        xtype : 'history',
        itemId : 'history',
        hidden: true,
        cls: 'list bordered'
      }]
    },

    initialize : function() {
      var model = this.getModel(),
          that = this,
          actionPnl = that.getComponent( 'actionPnl' ),
          btns = [actionPnl.getComponent( 'commentBtn' ),
                  actionPnl.getComponent( 'approveBtn' ),
                  actionPnl.getComponent( 'denyBtn' ),
                  actionPnl.getComponent( 'resolveBtn' ),
                  actionPnl.getComponent( 'closeBtn' )],
          COMMENT = 0, APPROVE = 1, DENY = 2, RESOLVE = 3, CLOSE = 4;

      // hide action button to simplify showing dependent module
      Ext.each( btns, function( btn ) { btn.hide(); } );

      if ( !model ) {
        return;
      }

      model.on( { 'loaded' : function() {
        var rawModel = model.getData( true /*include associated*/ ),
            module = rawModel.module;

        that.getComponent( 'summary' ).setData( rawModel );
        that.getComponent( 'history' ).setData( rawModel.history );
        that.getComponent( 'summary' ).show();
        that.getComponent( 'history' ).show();


        Ext.each({
          incident: [btns[COMMENT], btns[RESOLVE]],
          task: [btns[COMMENT], btns[CLOSE], btns[APPROVE], btns[DENY]],
          workorder: [btns[COMMENT], btns[CLOSE], btns[APPROVE], btns[DENY]],
          interaction: [btns[COMMENT]]
        }[module] || [], function( btn ) { btn.show(); } );
      } } );
    }
  } );
} )( window.Ext );