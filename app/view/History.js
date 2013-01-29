(function( Ext ) {
  'use strict';

  var tpl = [
    '<tpl for=".">',
    '<div>',
    '  <small class="pull-right">Origin {origin}</small>',
    '  <strong>{type}</strong>',
    '  <div>{update}</div>',
    '  <small>',
    '  {time:date("F j, Y, G:i:s")}',
    '  </small>',
    '  <hr/>',
    '</div>',
    '</tpl>'
  ];

  Ext.define( 'MobileClient.view.History', {
    extend: 'Ext.Container',

    xtype: 'history',

    config : {
      tpl : Ext.XTemplate( tpl.join( '' ) )
    },
  } );
} )( window.Ext );

//| date:'dd/MM/yyyy HH:mm:ss'