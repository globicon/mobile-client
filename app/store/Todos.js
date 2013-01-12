Ext.define( 'MobileClient.store.Todos', {
  extend : 'Ext.data.Store',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyGroupTodo',
      reader: 'json'
    }
  }
} );