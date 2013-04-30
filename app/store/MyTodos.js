Ext.define( 'MobileClient.store.MyTodos', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: options.urls.myTodos,
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );
