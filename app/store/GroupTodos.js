Ext.define( 'MobileClient.store.GroupTodos', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: options.urls.groupTodos,
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );