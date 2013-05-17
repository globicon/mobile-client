( function( Ext, MobileClient ) {
  'use strict';

  function slideToTodos( direction ) {
    window.location.hash = 'todos';
    Ext.Viewport.animateActiveItem( 'main', {
      type: 'slide',
      direction: direction || 'down'
    } );
  }

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
            slideToTodos( );
          },
          'created' : function( interaction ) {

            var desc = interaction.description.substring( 0, 20 );
            if ( interaction.description.length > desc.length ) {
              desc += '...';
            }

            Ext.Msg.show( {
              title: 'Interaction created',
              message: 'Interaction "' + desc + '" ' +
                'with id ' + interaction.id + ' was successfully created.',
              buttons: [
                { text:'Show Details', itemId: 'details' },
                { text:'OK', itemId: 'ok', ui: 'action' }
                ],
              icon: Ext.MessageBox.QUESTION,
              fn: function( button ) {
                if ( button === 'details' ) {
                  this.showDetails( interaction.id );
                }
              },
              scope: this
            } );

            slideToTodos();
          }
        },
        'details' : {
          'back' : function() {
            slideToTodos( 'right' );
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

    ensureStore : function( id ) {
      var store = Ext.StoreMgr.containsKey( id ) ?
          Ext.StoreMgr.get( id ) :
          Ext.create( 'MobileClient.store.' + id );

      store.ensureLoaded();
    },

    showMain : function( ) {
      var that = this;

      this.ensureStore( 'MyTodos' );
      this.ensureStore( 'GroupTodos' );
      this.ensureStore( 'Approvals' );
      this.ensureStore( 'Interactions' );

      Ext.Viewport.setActiveItem( 'main' );

      MobileClient.auth.on( {
        loggedOut : function() {
          Ext.StoreMgr.clear();
          that.redirectTo( 'signin');
        }
      } );
    }
  } );
} )( window.Ext, window.MobileClient );