Ext.define( 'MobileClient.store.GroupTodos', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyGroupTodo',
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );