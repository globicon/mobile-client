(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.UpdateChangeTask', {
    extend: 'Ext.data.Model',

    config: {
      fields: [
        { name: 'id', type: 'string' },
        { name: 'action', type: 'string' },
        { name: 'text',  type: 'string' },
        { name: 'rcMsg', type: 'string' },
        { name: 'rc', type: 'number', defaultValue: 0 }
      ],
      validations: [
        { type: 'presence', field: 'text', message: 'Please add a comment' }
      ]
    }
  });
} )( window.Ext );