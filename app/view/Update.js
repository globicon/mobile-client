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
      'MobileClient.model.UpdateChangeTask'
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

          items: [{
            name: 'update',
            label: 'Comment',
            xtype: 'textareafield',
            itemId: 'update',
            required: true
          },
          {
            name: 'resolution',
            label: 'Comment',
            xtype: 'textareafield',
            itemId: 'resolution',
            required: true
          },
          {
            name: 'text',
            label: 'Comment',
            xtype: 'textareafield',
            itemId: 'text',
            required: true
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
            itemId: 'closureCode',
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
      this.query( '#closureCode' )[0].setStore( resolutionStore );

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
        task: options.urls.updateTask
      };
      var models = {
        update: 'UpdateChangeTask',
        updateIncident: 'Update',
        resolve: 'Resolution',
        approve: 'UpdateChangeTask',
        deny: 'UpdateChangeTask',
        close: 'UpdateChangeTask'
      };
      var kind = this.get( 'kind' );
      var model = Ext.create( 'MobileClient.model.' + models[kind] );
      model.setProxy( {
        type: 'ajax',
        url: urls[this.get('module')]
      } );
      this.setRecord( model );
      if ( kind !== 'updateIncident' && kind !== 'resolution' ) {
        model.set( 'action', kind );
      }
      model.set( 'id', this.get( 'todoId' ) );
    },

    initializeUI : function() {
      var kind = this.get( 'kind' ),
          todoId = this.get( 'todoId' ),
          displayKind = kind.charAt(0).toUpperCase() + (/[a-z]+/).exec( kind )[0].slice(1),
          fields = [ this.query( '#update' )[0],
                     this.query( '#resolution' )[0],
                     this.query( '#text' )[0],
                     this.query( '#visibleToCustomer' )[0],
                     this.query( '#closureCode' )[0] ],
          UPDATE = 0, RESOLUTION = 1, TEXT = 2, VISIBLE_TO_CUSTOMER = 3, CLOSURE_CODE = 4;

      Ext.each( fields, function( f ) { f.hide(); } );

      this.query( '#toolbar' )[0].set( 'title', displayKind + ' ' + todoId );
      this.query( '#updateBtn' )[0].set( 'text', displayKind );

      Ext.each( {
        updateIncident: [UPDATE, VISIBLE_TO_CUSTOMER],
        resolve: [RESOLUTION, VISIBLE_TO_CUSTOMER, CLOSURE_CODE],
        update: [TEXT],
        approve: [TEXT],
        deny: [TEXT],
        close: [TEXT]
      }[kind], function( key ) { fields[key].show(); } );
    }
  });
})( window.Ext );
