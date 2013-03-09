(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.Todo', {
    extend: 'Ext.data.Model',
    mixins: ['Ext.mixin.Observable'],

    config: {
      fields: ['id',
                'title',
                'description',
                'module',
                'status',
                'priority',
                'assignee',
                'contact',
                'contactPhone',
                'contactFullname',
                'contactOperatorEmail',
                'assignmentGroup',
                'assignmentOperator',
                'assignmentOperatorPhone',
                'assignmentOperatorFullname',
                'assignmentOperatorEmail',
                { name: 'history',
                  convert: function( value ) {
                    var history = [];
                    if ( value ) {
                      history = value.map( function( v ) {
                        return Ext.create( 'MobileClient.model.History', v );
                      });
                    }
                    return history;
                  }} ]
    },

    getHistoryData: function() {
      return this.get( 'history' ).map( function( m ) { return m.getData(); } );
    },

    loadDetails : function( ) {
      var that = this;
      Ext.Ajax.request( {
        url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/ViewIncident',
        method: 'GET',
        disableCaching: false,
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
          attrs.history = respData.history;

          that.setData( attrs );

          that.fireEvent( 'loaded' );
        }
      } );
    }
  } );

} )( window.Ext );