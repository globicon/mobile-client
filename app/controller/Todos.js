Ext.define('MobileClient.controller.Todos', {
  extend: 'Ext.app.Controller',

  requires: [
    'MobileClient.Authentication',
    'MobileClient.view.Main'
  ],

  config: {
    before : {
      showMain : ['authenticate', 'ensureLoaded' ]
    },
    routes : {
      'todos' : 'showMain'
    },
    refs: {
      mainPanel: 'main',
      todonav: 'todonav'
    }
  },

  authenticate : function( action ) {
    MobileClient.auth.isAuthenticated() ?
      action.resume() :
      this.redirectTo( 'signin' );
  },

  ensureLoaded : function( action ) {
    if ( Ext.Viewport.items.length === 1 ) {
      Ext.Viewport.add( { xclass: 'MobileClient.view.Main' } );

      // TODO, show loading
      Ext.StoreMgr.get('MyTodos' ).load();
      Ext.StoreMgr.get('GroupTodos' ).load();
    }

    action.resume();
  },

  showMain : function() {
    Ext.Viewport.setActiveItem( 1 );
  }
});