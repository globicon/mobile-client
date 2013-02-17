(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.New', {
    extend: 'Ext.form.Panel',

    xtype: 'new-panel',

    requires: ['Ext.form.FieldSet'],

    config: {
      fullscreen: true,
      styleHtmlContent: true,
      cls: 'tight',

      items: [
      {
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
          align: 'right'
        }]
      },
      {
        xtype: 'panel',

        items: [
        {
          xtype: 'fieldset',
          layout: 'vbox',

          items: [
          {
            name: 'contact',
            label: 'Contact',
            xtype: 'textfield'
          },
          {
            name: 'description',
            label: 'Description',
            xtype: 'textareafield',
            maxRows: 4
          },
          {
            name: 'template',
            label: 'Template',
            xtype: 'selectfield',
            options: [
                {text: 'First Option',  value: 'first'},
                {text: 'Second Option', value: 'second'},
                {text: 'Third Option',  value: 'third'}
            ]
          },
          {
            name: 'solution',
            label: 'Solution',
            xtype: 'textareafield',
            placeHolder: 'Optional',
            maxRows: 4
          },
          ]
        }]
      }]
    }
  });
})( window.Ext );
