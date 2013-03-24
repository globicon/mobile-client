(function( Ext ) {
  'use strict';

  var urls = {
    incident: 'ViewIncident',
    task: 'ViewChangeTask',
    workorder: 'ViewWorkorder',
    interaction: 'ViewInteraction'
  };

  Ext.define( 'MobileClient.model.Todo', {
    extend: 'Ext.data.Model',
    mixins: ['Ext.mixin.Observable'],

    requires: [ 'MobileClient.model.History' ],

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
               'assignmentOperatorEmail'],
      hasMany: [ { model: 'MobileClient.model.History', name: 'history' } ]
    },

    loadDetails : function( ) {
      var that = this;
      Ext.Ajax.request( {
        url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/' +
          (urls[this.get('module')] || urls.incident),
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

          that.setData( attrs );
          that.history().removeAll();
          that.history().add( respData.history );

          that.fireEvent( 'loaded' );
        }
      } );
    }
  } );

} )( window.Ext );