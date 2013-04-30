(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.model.History', {
    extend: 'Ext.data.Model',

    config: {
      fields: [ 'update', 'title', 'origin', 'type',
               { name: 'time',
                 convert: function( value ) {
                  return new Date( parseInt( value, 10 ) );
                 }}]
    }
  });
})( window.Ext );