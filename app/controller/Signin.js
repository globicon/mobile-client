Ext.define('MobileClient.controller.Signin', {
  extend: 'Ext.app.Controller',

  requires: [
    'MobileClient.Authentication'
  ],

  config: {
    routes : {
      'signin' : 'showSignin'
    },
    refs: {
      signinForm: 'signin-panel'
    },
    control: {
      'signin-panel button': {
        tap: 'signin'
      }
    }
  },

  signin: function() {
    var form       = this.getSigninForm(),
        values     = form.getValues(),
        ctrl       = this;

    MobileClient.auth.authenticate( {
      user: values.user,
      pass: values.pass,
      success : function( ) {
        Ext.select( '.alert-error' ).addCls( 'hide' );
        ctrl.redirectTo( 'todos' );
      },
      failure : function() {
        Ext.select( '.alert-error' ).removeCls( 'hide' );
      }
    } );
  },

  showSignin : function() {
    Ext.Viewport.setActiveItem( 0 );
  }
});