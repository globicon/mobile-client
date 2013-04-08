(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Update', {
    extend: 'Ext.form.Panel',

    xtype: 'update-panel',

    requires: [
      'Ext.form.FieldSet',
      'Ext.field.Select',
      'MobileClient.model.Update',
      'MobileClient.model.Resolution',
      'MobileClient.model.UpdateChangeTask',
    ],

    config: {
      todoId: null,
      kind: null,
      module: null,
      fullscreen: true,
      styleHtmlContent: true,
      cls: 'tight',

      items: [{
        xtype : 'toolbar',
        docked: 'top',
        title: 'Update',
        itemId: 'toolbar',
        ui: 'light',
        items : [{
          // Cancel Button
          xtype: 'button',
          text: 'Cancel',
          handler: function() {
            this.up( 'update-panel' ).fireEvent( 'cancel' );
          }
        },
        {
          xtype: 'spacer'
        },
        { // Update Button
          xtype: 'button',
          text: 'Update',
          itemId: 'updateBtn',
          align: 'right',
          handler: function() {
            var form = this.up( 'update-panel' ),
                model = form.getRecord(),
                fieldset = form.down( 'fieldset' ),
                errorMsg = '',
                errors;

            fieldset.setInstructions( '' );

            form.updateRecord( model );

            errors = model.validate();
            if ( errors.isValid( ) ) {
              model.save( {
                callback: function( record ) {
                  if ( record.data.rc !== 0 ) {
                    // TODO: DO SOMETHING TO SHOW ERROR
                    fieldset.setInstructions( record.data.rcMsg );
                  }
                  else {
                    form.fireEvent( 'updated' );
                  }
                }
              } );
            }
            else {
              Ext.each( errors.items, function( rec ){
                errorMsg += rec.getMessage() + '<br>';
              } );
              fieldset.setInstructions( errorMsg );
            }
          }
        }]
      },
      {
        xtype: 'panel',

        items: [{
          xtype: 'fieldset',
          layout: 'vbox',

          items: [{
            name: 'update',
            label: 'Comment',
            xtype: 'textareafield',
            itemId: 'comment',
            required: true,
          },
          {
            name: 'text',
            label: 'Comment',
            xtype: 'textareafield',
            itemId: 'text',
            required: true,
          },
          {
            name: 'visibleToCustomer',
            itemId: 'visibleToCustomer',
            label: 'Visible to Customer',
            xtype: 'checkboxfield'
          },
          {
            name: 'closureCode',
            label: 'Resolution',
            xtype: 'selectfield',
            itemId: 'resolution',
            valueField: 'key',
            displayField: 'value'
          }
          ]
        }]
      }]
    },

    initialize: function() {
      var that = this;
      // Ensure resolution store created and loaded prior to initializing model.
      // Ensure resolution store is only loaded once.
      var resolutionStore = Ext.StoreMgr.containsKey( 'Resolutions' ) ?
        Ext.StoreMgr.get( 'Resolutions' ) :
        Ext.create( 'MobileClient.store.GeneralData', {
          storeId: 'Resolutions',
          action: 'resolutionCodeList'
        } );

      this.initializeUI();

      // associate store with select box
      this.query( '#resolution' )[0].setStore( resolutionStore );

      if ( resolutionStore.isLoaded() ) {
        that.initializeModel();
      }
      else { // if not loaded - load it and initialize model when loaded
        resolutionStore.on( 'load', function loadHandler() {
          that.initializeModel();
          resolutionStore.un( 'load', loadHandler );
        } );
        resolutionStore.load();
      }
    },

    initializeModel: function() {
      var urls = {
        incident: options.urls.updateIncident,
        workorder: options.urls.updateWorkorder,
        task: options.urls.updateTask,
      };
      var models = {
        update: 'Update',
        resolve: 'Resolution',
        approve: 'UpdateChangeTask',
        deny: 'UpdateChangeTask'
      };
      var kind = this.get( 'kind' );
      var model = Ext.create( 'MobileClient.model.' + models[kind] );
      model.setProxy( {
        type: 'ajax',
        url: urls[this.get('module')]
      } );
      this.setRecord( model );
      if ( kind === 'approve' || kind === 'deny' ) {
        model.set( 'action', kind );
      }
      model.set( 'id', this.get( 'todoId') );
    },

    initializeUI : function() {
      var kind = this.get( 'kind' ),
          todoId = this.get( 'todoId' ),
          displayKind = kind.charAt(0).toUpperCase() + kind.slice(1);

      this.query( '#toolbar' )[0].set( 'title', displayKind + ' ' + todoId );
      this.query( '#updateBtn' )[0].set( 'text', displayKind );

      if ( kind === 'update' ) {
        this.query( '#resolution' )[0].hide();
        this.query( '#text' )[0].hide();
      }
      if ( kind === 'approve' || kind === 'deny' ) {
        this.query( '#resolution' )[0].hide();
        this.query( '#visibleToCustomer' )[0].hide();
        this.query( '#comment' )[0].set( 'required', false );
        this.query( '#comment' )[0].hide();
        this.query( '#text' )[0].set( 'required', true );
      }
      if ( kind === 'resolve' ) {
        this.query( '#text' )[0].hide();
        this.query( '#comment' )[0].set( 'name', 'resolution' );
        this.query( '#resolution' )[0].set( 'required', true );
      }
    }
  });
})( window.Ext );
