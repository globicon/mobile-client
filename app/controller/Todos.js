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
    refs : {
      'mainView' : 'main'
    },
    control : {
      'todoList' : {
        disclose : 'showTodo',
        select : 'showTodo'
      }
    }
  },

  authenticate : function( action ) {
    MobileClient.auth.isAuthenticated() ?
      action.resume() :
      this.redirectTo( 'signin' );
  },

  showTodo : function( list, todo ) {
    var activeNav = this.getMainView().getActiveItem();
    activeNav.push({
      title: 'Second',
      html: todo.data.title
    });
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