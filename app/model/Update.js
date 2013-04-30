(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.Update', {
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
        { name: 'update',  type: 'string' },
        { name: 'rcMsg', type: 'string' },
        { name: 'rc', type: 'number', defaultValue: 0 }
      ],
      validations: [
        { type: 'presence', field: 'update', message: 'Please add a comment' }
      ]
    }
  });
} )( window.Ext );