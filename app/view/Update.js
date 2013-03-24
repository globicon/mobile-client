(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Update', {
    extend: 'Ext.form.Panel',

    xtype: 'update-panel',

    requires: [
      'Ext.form.FieldSet',
      'Ext.field.Select'
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
            console.log( model.getData() );

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
            autoCorrect: false,
            autoFocus: true
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
        incident: 'UpdateIncident',
        workorder: 'UpdateWorkOrder',
        task: 'UpdateChangeTask'
      };
      var models = {
        update: 'Update',
        resolve: 'Resolution'
      };
      var model = Ext.create( 'MobileClient.model.' + models[this.get('kind')] );
      model.setProxy( {
        type: 'ajax',
        url: 'http://expresso.globicon.dk:2993/TEGFacadeJSON/' + urls[this.get('module')]
      } );
      this.setRecord( model );
      model.set( 'id', this.get( 'todoId') );
    },

    initializeUI : function() {
      var kind = this.get( 'kind' ),
          todoId = this.get( 'todoId' ),
          displayKind = kind.charAt(0).toUpperCase() + kind.slice(1);

      this.query( '#toolbar' )[0].set( 'title', displayKind + ' ' + todoId );
      this.query( '#updateBtn' )[0].set( 'text', displayKind );

      if ( kind === 'update' || kind === 'close' ||
           kind === 'approve' || kind === 'deny' ) {
        this.query( '#resolution' )[0].hide();
      }
      if ( kind === kind === 'close' ||
           kind === 'approve' || kind === 'deny' ) {
        this.query( '#visibleToCustomer' )[0].hide();
      }
      if ( kind === 'resolve' ) {
        this.query( '#comment' )[0].set( 'name', 'resolution' );
        this.query( '#resolution' )[0].set( 'required', true );
      }
    }
  });
})( window.Ext );
