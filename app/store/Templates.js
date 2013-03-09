Ext.define( 'MobileClient.store.Templates', {
  extend : 'MobileClient.store.LoadAwareStore',

  config : {
    model : 'MobileClient.model.Template',
    proxy : {
      type : 'ajax',
      url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/GeneralData?action=templateList',
      reader: {
        type: 'json',
        record : 'row',
        rootProperty : 'records'
      }
    }
  }
} );
