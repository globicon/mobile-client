( function( Ext, MobileClient ) {
  'use strict';

  Ext.define('MobileClient.controller.Todos', {
    extend: 'Ext.app.Controller',

    requires: [
      'MobileClient.Authentication',
      'MobileClient.view.Details',
      'MobileClient.view.New'
    ],

    config: {
      before : {
        showMain : ['authenticate']
      },
      routes : {
        'todos' : 'showMain',
        'new' : 'showNew'
      },
      refs : {
        'mainView' : 'main'
      },
      control : {
        'todoList' : {
          disclose : 'showDetails',
          select : 'showDetails'
        },
        'todonav' : {
          'new' : function() {
            this.redirectTo( 'new' );
          }
        },
        'new-panel' : {
          'cancel' : function() {
            this.redirectTo( 'todos' );
          }
        }
      }
    },

    showNew : function() {
      Ext.Viewport.animateActiveItem( 'new-panel', { type: 'slide', direction: 'up' } );
    },

    authenticate : function( action ) {
      if ( MobileClient.auth.isAuthenticated() ) {
        action.resume();
        return;
      }
      this.redirectTo( 'signin' );
    },

    showDetails : function( list, todo ) {
      var activeNav = this.getMainView().getActiveItem();

      activeNav.push( Ext.create( 'MobileClient.view.Details', {
        model : todo,
        title : todo.getId()
      } ) );

      todo.loadDetails();

      // remove selection - making item ready to be selected again
      list.deselectAll( true );
    },

    showMain : function() {
      var that = this;

      Ext.StoreMgr.get( 'MyTodos' ).ensureLoaded();
      Ext.StoreMgr.get( 'GroupTodos' ).ensureLoaded();
      Ext.StoreMgr.get( 'Approvals' ).ensureLoaded();

      if ( !this.loaded ) {
        Ext.Viewport.items.get( 1 ).setActiveItem( 0 );
        Ext.Viewport.setActiveItem( 'main' );
      }
      else {
        Ext.Viewport.animateActiveItem( 'main', { type: 'slide', direction: 'down' } );
      }

      MobileClient.auth.on( {
        loggedOut : function() {
          Ext.each( Ext.StoreMgr.all, function( store ) {
            store.removeAll();
          } );
          that.redirectTo( 'signin');
        }
      } );
    }
  } );
} )( window.Ext, window.MobileClient );