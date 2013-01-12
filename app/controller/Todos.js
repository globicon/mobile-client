Ext.define('MobileClient.controller.Todos', {
  extend: 'Ext.app.Controller',

  requires: [
    'MobileClient.Authentication'
  ],

  config: {
    before : {
      showMain : ['authenticate', 'ensureLoaded' ]
    },
    routes : {
      'todos' : 'showMain'
    },
    refs: {
      mainPanel: 'main'
    }
  },

  authenticate : function( action ) {
    if ( MobileClient.auth.isAuthenticated() ) {
      action.resume();
    }
    else {
      this.redirectTo('signin');
    }
  },

  ensureLoaded : function( action ) {
    action.resume();
  },

  showMain : function() {
    Ext.Viewport.setActiveItem( 1 );
  }
});