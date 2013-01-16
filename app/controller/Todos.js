Ext.define('MobileClient.controller.Todos', {
  extend: 'Ext.app.Controller',

  requires: [
    'MobileClient.Authentication'
  ],

  config: {
    before : {
      showMain : ['authenticate']
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

  showMain : function() {
    var that = this;

    Ext.StoreMgr.get('MyTodos').load();
    Ext.StoreMgr.get('GroupTodos').load();

    Ext.Viewport.items.get( 1 ).setActiveItem( 0 );
    Ext.Viewport.setActiveItem( 1 );

    MobileClient.auth.on( {
      loggedOut : function() { that.redirectTo( 'signin'); }
    } );
  }
});