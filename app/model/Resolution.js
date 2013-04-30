(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.Resolution', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        { name: 'id', type: 'string' },
        { name: 'visibleToCustomer', type: 'string', defaultValue : 'no',
          convert : function( value ) {
            if ( !value || value === 'no' ) {
              return 'no';
            }
            return 'yes';
          } },
        { name: 'resolution',  type: 'string' },
        { name: 'closureCode',  type: 'string' },
        { name: 'rcMsg', type: 'string' },
        { name: 'rc', type: 'number', defaultValue: 0 }
      ],
      validations: [
        { type: 'presence', field: 'resolution', message: 'Please specify Comment' },
        { type: 'presence', field: 'closureCode', message: 'Please specify Resolution' }
      ]
    }
  });
} )( window.Ext );