(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Search', {
    extend: 'Ext.Panel',

    xtype: 'search',

    config : {

      layout: 'vbox',

      items: [ {
        styleHtmlContent: true,

        xtype: 'formpanel',
        height: 200,
        style: 'margin-bottom:-20px;',

        items: [ {
          xtype: 'fieldset',
          items: [ {
            xtype: 'textfield',
            name : 'id',
            label: 'Ticket Id'
          },
          {
            xtype: 'textfield',
            name : 'contact',
            label: 'Contact Initials'
          },
          {
            xtype: 'textfield',
            name : 'assignmentGroup',
            label: 'Assignment Group'
          },
          {
            xtype: 'button',
            text: 'Search',
            ui: 'action',
            handler: function() {
              var store = this.up( 'search' ).store,
                  proxy = store.getProxy(),
                  values = this.up( 'formpanel' ).getValues();


              proxy.setExtraParams( {} );
              proxy.setExtraParams( {
                assignmentGroup: values.assignmentGroup,
                id: values.id,
                contact : values.contact
              } );
              store.load();
            }
          } ]
        } ]
      },
      {
        xtype : 'todoList',
        itemId: 'searchResults',
        store : {
          model : 'MobileClient.model.Todo',
          proxy : {
            enablePagingParams: false,
            type : 'ajax',
            url: options.urls.search,
            reader: {
              type: 'json',
              record : 'row',
              rootProperty : 'records'
            }
          }
        },
        flex: '1'
      } ]
    },

    initialize : function() {
      var results = this.query( '#searchResults' )[0];
      this.store = results.getStore();
    }
  } );
} )( window.Ext );