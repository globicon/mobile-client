Ext.define( 'MobileClient.view.Signin', {
  extend: 'Ext.form.Panel',

  xtype: 'signin-panel',

  title: 'Signin',

  requires: ['Ext.form.FieldSet', 'Ext.field.Password'],

  config: {
    fullscreen: true,
    styleHtmlContent: true,

    items: [
    {
      xtype: 'fieldset',
      title: 'Please Signin',
      layout: 'vbox',

      items: [
      {
        name: 'user',
        xtype: 'textfield',
        label: 'Username',
        labelWidth: '32%',
        labelWrap: true
      },
      {
        name: 'pass',
        xtype: 'passwordfield',
        label: 'Password',
        labelWidth: '32%',
        labelWrap: true
      }
      ]
    },
    {
      html : '<div class="alert alert-error hide">Invalid username/password combination</div>'
    },
    {
      xtype: 'button',
      text: 'Signin',
      ui: 'confirm'
    }
    ]
  }
});
