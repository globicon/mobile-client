(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.TodoList', {
    extend: 'Ext.List',
    requires : ['MobileClient.plugin.PullRefreshAll'],

    xtype: 'todoList',

    config : {
      scrollable: true,
      styleHtmlContent: true,
      onItemDisclosure: true,
      selectedCls : 'none',

      plugins: [{
        xclass: 'MobileClient.plugin.PullRefreshAll'
      }],

      itemTpl : [
        '<div style="margin-bottom:20px;">',
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
        '  </tpl>',
        '</div>',
        '</div>'
      ].join('')
    }
  });
} )( window.Ext );