(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.Incident', {
    extend : 'MobileClient.model.Todo',

    constructor: function( config ) {
      if ( config.copy ) {
        this.setData( config.copy.getData() );
      }
    }
  } );
} )( window.Ext );