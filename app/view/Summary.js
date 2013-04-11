(function( Ext ) {
  'use strict';

  var tpl = [
    '<div>',
    '<small class="pull-right">{status} - P{priority}</small>',
    '<tpl if="module == \'incident\'">',
    '  <div class="rect rect-yellow pull-left">IM</div>',
    '<tpl elseif="module == \'workorder\'">',
    '  <div class="rect rect-green pull-left">WO</div>',
    '<tpl elseif="module == \'interaction\'">',
    '  <div class="rect rect-green-lighter pull-left">SD</div>',
    '<tpl elseif="module == \'task\'">',
    '  <div class="rect rect-blue pull-left">T</div>',
    '</tpl>',
    '<div class="list-content">',
    '  <div><strong>{title}</strong></div>',
    '  <div><small>{id} - {contactFullname}</small></div>',
    '  <tpl if="assignee != \'N/A\'">',
    '    <div><small>{assignmentGroup} - {assignee}</small></div>',
    '  <tpl else>',
    '    <div>&nbsp;</div>',
    '  </tpl>',
    '</div>',
    '<p>{[values.description.replace( /\\n/g, "<br>" )]}</p>',
    '<hr/>',
    '<address>',
    '  <strong>Contact</strong><br/>',
    '  <tpl if="contact">',
    '    {contactFullname} ({contact})<br/>',
    '  </tpl>',
    '  <tpl if="contactEmail">',
    '    <a href="mailto:{contactEmail}">{contactEmail}</a><br/>',
    '  </tpl>',
    '  <tpl if="contactPhone">',
    '    Phone: <a href="tel:{contactPhone}">{contactPhone}</a><br/>',
    '  </tpl>',
    '</address>',
    '<hr/>',
    '<address>',
    '  <strong>Assignment Operator</strong><br/>',
    '  <tpl if="assignmentOperator">',
    '    {assignmentOperatorFullname} ({assignmentOperator})<br/>',
    '  </tpl>',
    '  <tpl if="assignmentOperatorEmail">',
    '    <a href="mailto:{assignmentOperatorEmail}">{assignmentOperatorEmail}</a><br/>',
    '  </tpl>',
    '  <tpl if="assignmentOperatorPhone">',
    '    Phone: <a href="tel:{assignmentOperatorPhone}">{assignmentOperatorPhone}</a><br/>',
    '  </tpl>',
    ' </address>',
    ' <br/>',
    '</div>'
  ];

  Ext.define( 'MobileClient.view.Summary', {
    extend: 'Ext.Container',

    xtype: 'summary',

    config : {
      model : null,
      tpl : Ext.XTemplate( tpl.join('') )
    }
  });
} )( window.Ext );