( function( Ext, MobileClient ) {
  'use strict';

  Ext.define('MobileClient.controller.Todos', {
    extend: 'Ext.app.Controller',

    requires: [
      'MobileClient.Authentication',
      'MobileClient.view.Details'
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
      if ( MobileClient.auth.isAuthenticated() ) {
        action.resume();
        return;
      }
      this.redirectTo( 'signin' );
    },

    showTodo : function( list, todo ) {
      var activeNav = this.getMainView().getActiveItem();

      var model = Ext.create( 'MobileClient.model.Incident',
                              { id : todo.getId(), copy : todo } );

      activeNav.push( Ext.create( 'MobileClient.view.Details', {
        model : model,
        title : model.getId()
      } ) );

      model.loadDetails();

      // remove selection - making item ready to be selected again
      list.deselectAll( true );
    },

    showMain : function() {
      var that = this;

      Ext.StoreMgr.get('MyTodos').load();
      Ext.StoreMgr.get('GroupTodos').load();
      Ext.StoreMgr.get('Approvals').load();

      Ext.Viewport.items.get( 1 ).setActiveItem( 0 );
      Ext.Viewport.setActiveItem( 1 );

      MobileClient.auth.on( {
        loggedOut : function() { that.redirectTo( 'signin'); }
      } );
    }
  } );
} )( window.Ext, window.MobileClient );