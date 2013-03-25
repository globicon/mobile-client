(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Details', {
    extend: 'Ext.Container',

    requires: [
      'MobileClient.view.Summary',
      'MobileClient.view.History',
      'MobileClient.view.Update'
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
        // top toolBar
        itemId: 'toolbar',
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
      // bottom toolbar
      {
        itemId: 'actionPnl',
        xtype: 'toolbar',
        docked: 'bottom',
        ui: 'light',
        items : [{
          // Update Button
          itemId: 'updateBtn',
          xtype: 'button',
          text: 'Update',
          handler: function() {
            this.up( 'details' ).showUpdatePnl( 'update' );
          }
        },
        { // Resolve Button
          itemId: 'resolveBtn',
          xtype: 'button',
          text: 'Resolve',
          align: 'right',
          handler: function() {
            this.up( 'details' ).showUpdatePnl( 'resolve' );
          }
        },
        {
          xtype: 'spacer'
        },
        { // Close Button
          itemId: 'closeBtn',
          xtype: 'button',
          text: 'Close',
          align: 'right',
          handler: function() {
            this.up( 'details' ).showUpdatePnl( 'close' );
          }
        },
        { // Approve Button
          itemId: 'approveBtn',
          xtype: 'button',
          text: 'Approve',
          align: 'right',
          handler: function() {
            this.up( 'details' ).showUpdatePnl( 'approve' );
          }
        },
        { // Deny Button
          itemId: 'denyBtn',
          xtype: 'button',
          text: 'Deny',
          align: 'right',
          handler: function() {
            this.up( 'details' ).showUpdatePnl( 'deny' );
          }
        },
        ]
      },
      // Summary Panel
      {
        xtype: 'summary',
        itemId: 'summary',
        hidden: true,
        cls: 'bordered bordered-top'
      },
      // History Panel
      {
        xtype : 'history',
        itemId : 'history',
        hidden: true,
        cls: 'list bordered'
      }]
    },

    animateDown : function( endFn ) {
      Ext.Viewport.animateActiveItem( this, {
        type: 'slide',
        direction: 'down',
        listeners: {
          animationend: function() {
            endFn();
          }
        }
      } );
    },

    // Show panel for updating todo
    showUpdatePnl: function( kind ) {
      var updatePnl = Ext.create( 'MobileClient.view.Update', {
        todoId: this.getModel().get('id'),
        module: this.getModel().get('module'),
        kind: kind
      } );
      var that = this;

      Ext.Viewport.animateActiveItem( updatePnl, {
        type: 'slide',
        direction: 'up'
      } );

      updatePnl.on( { 'cancel': function() {
        that.animateDown( function() { updatePnl.destroy(); } );
      } } );

      updatePnl.on( { 'updated': function() {
        that.animateDown( function() {
          updatePnl.destroy();
          that.getModel().loadDetails();
        } );
      } } );
    },

    // show and hide the buttons in the action bar, based on model.module
    updateActionPnl : function( module ) {
      var actionPnl = this.getComponent( 'actionPnl' ),
          btns = [actionPnl.getComponent( 'updateBtn' ),
                  actionPnl.getComponent( 'approveBtn' ),
                  actionPnl.getComponent( 'denyBtn' ),
                  actionPnl.getComponent( 'resolveBtn' ),
                  actionPnl.getComponent( 'closeBtn' )],
          UPDATE = 0, APPROVE = 1, DENY = 2, RESOLVE = 3, CLOSE = 4;

      // first hide action button to simplify showing dependent module
      Ext.each( btns, function( btn ) { btn.hide(); } );
      // show based on module
      Ext.each({
        incident: [btns[UPDATE], btns[RESOLVE]],
        task: [btns[UPDATE], btns[CLOSE], btns[APPROVE], btns[DENY]],
        workorder: [btns[UPDATE], btns[CLOSE], btns[APPROVE], btns[DENY]],
        interaction: []
      }[module] || [], function( btn ) { btn.show(); } );
    },

    initialize : function() {
      var model = this.getModel(),
          that = this;

      if ( !model ) {
        return;
      }
      this.query( '#toolbar' )[0].set( 'title', model.get( 'id' ) );
      this.updateActionPnl( model.get( 'module' ) );

      model.on( { 'loaded' : function() {
        var rawModel = model.getData( true /*include associated*/ ),
            summaryPnl = that.getComponent( 'summary' ),
            historyPnl = that.getComponent( 'history' );

        summaryPnl.setData( rawModel );
        historyPnl.setData( rawModel.history );
        summaryPnl.show();
        historyPnl.show();
        that.updateActionPnl( model.get( 'module' ) );
      } } );
    }
  } );
} )( window.Ext );