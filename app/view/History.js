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
    '  <tpl if="operator">',
    '  {time:date("F j, Y, G:i:s")} by {operator}',
    '  <tpl else>',
    '  {time:date("F j, Y, G:i:s")}',
    '  </tpl>',
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