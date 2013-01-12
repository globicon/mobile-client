Ext.define( 'MobileClient.model.Todo', {
  extend : 'Ext.data.Model',

  config : {
    fields : ['id',
              'assignmentGroup',
              'title',
              'module',
              'status',
              'priority',
              'assignee',
              'contactFullname']
  }
} );