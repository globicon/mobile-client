(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.KeyValue', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        { name: 'key', type: 'string' },
        { name: 'value',  type: 'string' }
      ]
    }
  });
} )( window.Ext );