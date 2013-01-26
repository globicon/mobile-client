(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.Incident', {
    extend : 'MobileClient.model.Todo',

    mixins: ['Ext.mixin.Observable'],

    constructor: function( config ) {
      if ( config.copy ) {
        this.setData( config.copy.getData() );
      }
    },

    loadDetails : function( ) {
      var that = this;
      Ext.Ajax.request( {
        url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/ViewIncident',
        method : 'GET', // TODO: change to POST
        disableCaching : false,
        withCredentials: true,

        params: {
          id: this.getId()
        },

        success: function( response ) {
          var respData = Ext.JSON.decode( response.responseText.trim() );

          var attrs = that.getData();

          Object.keys( respData.attributes ).forEach( function( key ) {
            attrs[key] = respData.attributes[key];
          } );

          that.setData( attrs );

          that.fireEvent( 'loaded' );
        }
      } );
    }
  } );
} )( window.Ext );