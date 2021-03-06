(function( Ext, window ) {
  'use strict';

  //<debug>
  Ext.Loader.setPath({
    'Ext': 'touch/src',
    'MobileClient': 'app'
  });
  //</debug>

  Ext.application({
    name: 'MobileClient',

    requires: [
      'Ext.MessageBox'
    ],

    views: ['Signin','Main'],
    controllers : ['Signin', 'Todos'],
    models : ['Todo', 'Incident', 'KeyValue', 'Interaction'],
    stores : ['MyTodos', 'GroupTodos', 'Approvals', 'Interactions', 'GeneralData', 'LoadAwareStore'],

    icon: {
      '57': 'resources/icons/Icon.png',
      '72': 'resources/icons/Icon~ipad.png',
      '114': 'resources/icons/Icon@2x.png',
      '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
      '320x460': 'resources/startup/320x460.jpg',
      '640x920': 'resources/startup/640x920.png',
      '768x1004': 'resources/startup/768x1004.png',
      '748x1024': 'resources/startup/748x1024.png',
      '1536x2008': 'resources/startup/1536x2008.png',
      '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
      // Destroy the #appLoadingIndicator element
      //Ext.fly('appLoadingIndicator').destroy();

      window.MobileClient.auth = Ext.create( 'MobileClient.Authentication', {
        url : options.urls.login,
        logoutUrl : options.urls.logout
      } );

      Ext.Ajax.on({
        beforerequest : function() {
          Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading',
            indicator: true
          });
        },
        requestcomplete : function() {
          Ext.Viewport.setMasked( false );
        },
        requestexception: function( conn, response ) {
          Ext.Viewport.setMasked( false );
          if ( response.status === 401 ) {
            window.MobileClient.auth.clear();
            Ext.StoreMgr.clear();
            this.redirectTo( 'signin' );
          }
        },
        scope: this
      });

      // Initialize the main view
      Ext.Viewport.add( { xclass: 'MobileClient.view.Signin' } );
      Ext.Viewport.add( { xclass: 'MobileClient.view.Main' } );
    },

    onUpdated: function() {
      Ext.Msg.confirm(
        'Application Update',
        'This application has just successfully been updated to the latest version. Reload now?',
        function( buttonId  ) {
          if ( buttonId === 'yes' ) {
            window.location.reload();
          }
        } );
    }
  });
})(window.Ext, window);
