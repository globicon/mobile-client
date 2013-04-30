Ext.define( 'MobileClient.store.Interactions', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: options.urls.interactions,
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );
