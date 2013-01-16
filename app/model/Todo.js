Ext.define( 'MobileClient.model.Todo', {
  extend : 'Ext.data.Model',

  config : {
    fields : ['id',
              'title',
              'module',
              'status',
              'priority',
              'assignee',
              'assignmentGroup',
              'contactFullname']
  }
} );