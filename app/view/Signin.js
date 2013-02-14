(function( Ext ) {
  'use strict';

  Ext.define( 'MobileClient.view.Signin', {
    extend: 'Ext.form.Panel',

    xtype: 'signin-panel',

    title: 'Signin',

    requires: ['Ext.form.FieldSet', 'Ext.field.Password'],

    config: {
      fullscreen: true,
      styleHtmlContent: true,
      cls: 'tight',

      items: [
      {
        xtype: 'panel',
        cls: 'bordered container-centered',
        width: '90%',
        height: '100%',

        items: [
        {
          xtype: 'image',
          src: 'resources/icons/logo-with-text.png',
          width: '100%',
          height: 400
        },
        {
          xtype: 'fieldset',
          title: 'Please Signin',
          layout: 'vbox',

          items: [
          {
            name: 'user',
            label: ' ',
            labelWidth: '34px',
            labelCls: 'icon-user',
            xtype: 'textfield',
            clearIcon: false,
            placeHolder: 'Username'
          },
          {
            name: 'pass',
            label: ' ',
            labelWidth: '34px',
            labelCls: 'icon-lock',
            xtype: 'passwordfield',
            clearIcon: false,
            placeHolder: 'Password'
          }]
        },
        {
          html : '<div class="alert alert-error hide">Invalid username/password combination</div>'
        },
        {
          xtype: 'button',
          text: 'Signin',
          ui: 'action',
        }]
      }]
    }
  });
})( window.Ext );
