(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.New', {
    extend: 'Ext.form.Panel',

    xtype: 'new-panel',

    requires: [
      'Ext.form.FieldSet',
      'Ext.field.Select'
    ],

    config: {
      templateOptions: [],
      fullscreen: true,
      styleHtmlContent: true,
      cls: 'tight',

      items: [{
        xtype : 'toolbar',
        docked: 'top',
        title: 'Create New',
        ui: 'light',
        items : [{
          xtype: 'button',
          text: 'Cancel',
          handler: function() {
            this.up( 'new-panel' ).fireEvent( 'cancel' );
          }
        },
        {
          xtype: 'spacer'
        },
        {
          xtype: 'button',
          text: 'Create',
          align: 'right',
          handler: function() {
            var form = this.up( 'new-panel' ),
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
                  }
                  fieldset.setInstructions( record.data.rcMsg );
                }
              } );
            }
            else {
              Ext.each( errors.items, function( rec, i ){
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
            name: 'contact',
            label: 'Contact',
            xtype: 'textfield',
            required: true,
            autoCorrect: false,
            autoFocus: true
          },
          {
            name: 'description',
            label: 'Description',
            xtype: 'textareafield',
            required: true,
            maxRows: 4
          },
          {
            name: 'template',
            label: 'Template',
            xtype: 'selectfield',
            store: 'Templates',
            valueField: 'key',
            displayField: 'value'
          },
          {
            name: 'solution',
            label: 'Solution',
            xtype: 'textareafield',
            placeHolder: 'Optional',
            maxRows: 4
          }
          ]
        }]
      }]
    },

    initialize: function() {
      var that = this;
      /* TODO: figure out if it is better to recreate object when shown */
      this.on( { show: function() {
        // Ensure template store is loaded prior to initializing model.
        // Ensure template store is only loaded once.
        var templateStore = Ext.StoreMgr.get( 'Templates' );
        if ( templateStore.isLoaded() ) {
          that.initializeModel();
        }
        else { // if not loaded - load it and initialize model when loaded
          templateStore.on( 'load', function loadHandler() {
            that.initializeModel();
            templateStore.un( 'load', loadHandler );
          } );
          templateStore.load();
        }
      } } );
    },

    initializeModel: function() {
      this.setRecord( Ext.create( 'MobileClient.model.Interaction', {} ) );
      this.down( 'fieldset' ).setInstructions( '' );
    }
  });
})( window.Ext );
