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
    Ext.StoreMgr.get('MyTodos' ).load();
    Ext.StoreMgr.get('GroupTodos' ).load();
    Ext.Viewport.setActiveItem( 1 );
  }
});