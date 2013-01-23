Ext.define( 'MobileClient.model.Incident', {
  extend : 'MobileClient.model.Todo',

  mixins: ['Ext.mixin.Observable'],

  config : {
    fields: ['description']
  },

  load : function( ) {
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
        that.setData( respData.attributes );
        that.fireEvent( 'loaded' );
      }
    } );
  }
} );