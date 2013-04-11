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
        'todo/:id' : 'showDetails',
        'new' : 'showNew'
      },
      refs : {
        'mainView' : 'main'
      },
      control : {
        'todoList' : {
          select : function( list, todo ) {
            this.redirectTo( 'todo/' + todo.getId() );
          }
        },
        'main' : {
          'new' : function() {
            this.redirectTo( 'new' );
          }
        },
        'new-panel' : {
          'cancel' : function() {
            window.location.hash = 'todos';
            Ext.Viewport.animateActiveItem( 'main', {
              type: 'slide',
              direction: 'down'
            } );
          }
        },
        'details' : {
          'back' : function() {
            window.location.hash = 'todos';
            Ext.Viewport.animateActiveItem( 'main', {
              type: 'slide',
              direction: 'right'
            } );
          }
        }
      }
    },

    showNew : function() {
      var newView = Ext.create( 'MobileClient.view.New' );
      Ext.Viewport.animateActiveItem( newView, {
        type: 'slide',
        direction: 'up'
      } );
    },

    authenticate : function( action ) {
      if ( MobileClient.auth.isAuthenticated() ) {
        action.resume();
        return;
      }
      this.redirectTo( 'signin' );
    },

    getModuleFromId : function( id ) {
      var startsWith = function( str ) { return id.indexOf(str) === 0; },
          prefixes = [{ prefix: 'IM', module: 'incident' },
                      { prefix: 'WO', module: 'workorder' },
                      { prefix: 'SD', module: 'interaction' },
                      { prefix: 'T', module: 'task' }];

      for ( var i = 0; i < prefixes.length; i++ ) {
        if ( startsWith( prefixes[i].prefix ) ) {
          return prefixes[i].module;
        }

      }
      return 'incident';
    },

    showDetails : function( id ) {
      var todo = Ext.create( 'MobileClient.model.Todo', {
        id: id,
        module: this.getModuleFromId( id )
      } );
      var detailsView = Ext.create( 'MobileClient.view.Details', {
        model: todo,
        title: id
      } );
      todo.loadDetails();

      Ext.Viewport.animateActiveItem( detailsView, {
        type: 'slide',
        direction: 'left'
      } );
      // remove selection - making item ready to be selected again
      var activeItem = Ext.Viewport.items.get( 1 ).getActiveItem();
      if ( activeItem.xtype !== 'todoList' ) {
        activeItem = activeItem.query('todoList')[0];
      }
      activeItem.deselectAll( true );
    },

    showMain : function( ) {
      var that = this;

      Ext.StoreMgr.get( 'MyTodos' ).ensureLoaded();
      Ext.StoreMgr.get( 'GroupTodos' ).ensureLoaded();
      Ext.StoreMgr.get( 'Approvals' ).ensureLoaded();

      Ext.Viewport.setActiveItem( 'main' );

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