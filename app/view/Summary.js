(function( Ext ) {
  'use strict';

  var tpl = [
    '<div>',
    '<small class="pull-right">{status} - P{priority}</small>',
    '<tpl if="module == \'incident\'">',
    '  <div class="rect rect-blue pull-left">IM</div>',
    '<tpl elseif="module == \'workorder\'">',
    '  <div class="rect rect-green pull-left">WO</div>',
    '<tpl elseif="module == \'interaction\'">',
    '  <div class="rect rect-gray pull-left">int</div>',
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
    '<p>{description}</p>',
    '<hr/>',
    '<address>',
    '  <strong>Contact</strong><br/>',
    '  <tpl if="contact">',
    '    {contactFullname} ({contact})<br/>',
    '  </tpl>',
    '  <tpl if="contactEmail">',
    '    {contactEmail}<br/>',
    '  </tpl>',
    '  <tpl if="contactPhone">',
    '    Phone: {contactPhone}<br/>',
    '  </tpl>',
    '</address>',
    '<hr/>',
    '<address>',
    '  <strong>Assignment Operator</strong><br/>',
    '  <tpl if="assignmentOperator">',
    '    {assignmentOperatorFullname} ({assignmentOperator})<br/>',
    '  </tpl>',
    '  <tpl if="assignmentEmail">',
    '    {assignmentEmail}<br/>',
    '  </tpl>',
    '  <tpl if="assignmentPhone">',
    '    Phone: {assignmentPhone}<br/>',
    '  </tpl>',
    ' </address>',
    ' <br/>',
    '</div>'];

  Ext.define( 'MobileClient.view.Summary', {
    extend: 'Ext.Container',

    xtype: 'summary',

    config : {
      model : null,
      tpl : Ext.XTemplate( tpl.join('') ),
    }
  });
} )( window.Ext );