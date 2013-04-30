Ext.define( 'MobileClient.store.Approvals', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: options.urls.approvals,
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );
