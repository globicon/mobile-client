Ext.define( 'MobileClient.store.Approvals', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Todo',
    proxy : {
      type : 'ajax',
      url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyCasesForApproval',
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );
