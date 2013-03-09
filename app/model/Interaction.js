(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.Interaction', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        { name: 'contact', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'template',  type: 'string' },
        { name: 'solution',  type: 'string' },
        { name: 'rcMsg', type: 'string' },
        { name: 'rc', type: 'number', defaultValue: 0 }
      ],
      validations: [
        { type: 'presence', field: 'contact', message: 'Please specify Contact' },
        { type: 'presence', field: 'description', message: 'Please specify Description' }
      ],
      proxy: {
        type: 'ajax',
        url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/NewInteraction'
      }
    }
  });
} )( window.Ext );