(function( Ext ){
  'use strict';

  Ext.define( 'MobileClient.store.GeneralData', {
    extend : 'MobileClient.store.LoadAwareStore',

    config : {
      action: null,
      model : 'MobileClient.model.KeyValue',
      proxy : {
        type : 'ajax',
        url: options.urls.generalData,
        reader: {
          type: 'json',
          record : 'row',
          rootProperty : 'records'
        }
      }
    },

    initialize : function( ) {
      var proxy = this.getProxy(),
          url = proxy.getUrl();

      proxy.setUrl( url + '?action=' + this.get('action') );
    }
  } );
})( window.Ext );