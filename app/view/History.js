(function( Ext ) {
  'use strict';

  var tpl = [
    '<tpl if="length &gt; 0">',
    '  <div class="list-title">History</div>',
    '</tpl>',
    '<tpl for=".">',
    '<div class="list-item-bordered">',
    '  <small class="pull-right">Origin {origin}</small>',
    '  <strong>{type}</strong>',
    '  <div>{update}</div>',
    '  <small>',
    '  {time:date("F j, Y, G:i:s")}',
    '  </small>',
    '</div>',
    '</tpl>'
  ];

  Ext.define( 'MobileClient.view.History', {
    extend: 'Ext.Container',

    xtype: 'history',

    config : {
      tpl : Ext.XTemplate( tpl.join( '' ) )
    }
  } );
} )( window.Ext );