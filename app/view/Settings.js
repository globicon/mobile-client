(function( Ext, MobileClient ) {
  'use strict';

  Ext.define( 'MobileClient.view.Settings', {
    extend: 'Ext.Panel',

    requires: ['Ext.DateExtras'],

    xtype: 'settings',

    config : {
      styleHtmlContent: true,

      items: [{
        docked: 'top',
        xtype: 'toolbar',
        title: 'Account'
      },
      {
        xtype : 'container',
        cls: 'bordered',
        itemId: 'content',

        items: [
        {
          xtype : 'container',
          html : 'Not Signed In',
          itemId: 'userInfo'
        },
        {
          xtype: 'button',
          text: 'Sign out',
          ui: 'normal',
          handler: function() {
            MobileClient.auth.logout();
          }
        }]
      }]
    },

    initialize : function() {
      var userPanel = this.getComponent('content').getComponent( 'userInfo' ),
          formatCurrentUser = function() {
            var authInfo = MobileClient.auth.getAuthInfo();
            return '<p class="centered">' +
                   '<h2>' + authInfo.user + '</h2>' +
                   '<div>Signed in ' + Ext.Date.format(authInfo.date, 'F j, Y, G:i') + '</div>' +
                   '</p>';
          };

      userPanel.setHtml( formatCurrentUser() );

      MobileClient.auth.on( {
        'authenticated' : function() {
          userPanel.setHtml( formatCurrentUser() );
        }
      });
    }
  });
})( window.Ext, window.MobileClient );