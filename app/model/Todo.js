Ext.define( 'MobileClient.model.Todo', {
  extend : 'Ext.data.Model',

  config : {
    fields : ['id',
              'title',
              'description',
              'module',
              'status',
              'priority',
              'assignee',
              'contact',
              'contactPhone',
              'contactFullname',
              'contactOperatorEmail',
              'assignmentGroup',
              'assignmentOperator',
              'assignmentOperatorPhone',
              'assignmentOperatorFullname',
              'assignmentOperatorEmail',
              'history']
  }
} );