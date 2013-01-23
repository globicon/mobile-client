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
  controllers : ['Signin','Todos'],
  models : ['Todo','Incident'],
  stores : ['MyTodos', 'GroupTodos', 'Approvals'],

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
    Ext.fly('appLoadingIndicator').destroy();

    MobileClient.auth = Ext.create( 'MobileClient.Authentication', {
      url : 'http://expresso.globicon.dk:2993/TEGFacadeJSON/Login',
      logoutUrl : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/Logout'
    } );

    Ext.Ajax.on({
      beforerequest : function( conn, options, eOpts ) {
        Ext.Viewport.setMasked({
          xtype: 'loadmask',
          message: 'Loading',
          indicator: true
        });
      },
      requestcomplete : function( conn, response, options, eOpts ) {
        Ext.Viewport.setMasked( false );
      },
      requestexception: function( conn, response, options, eOpts ) {
        Ext.Viewport.setMasked( false );
        if ( response.status === 401 ) {
          MobileClient.auth.clear();
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
      function(buttonId) {
        if (buttonId === 'yes') {
          window.location.reload();
        }
      } );
  }
});

var setupPCScrollbar = function(container){
    var isMobile = (navigator.appVersion.toLowerCase().indexOf("mobile") > -1 || navigator.appVersion.toLowerCase().indexOf("ipad") > -1);
    if(!isMobile){
        if(container.isXType('selectfield'))container = container.down('list');// Add support for selectbuttons
        if(!Ext.isFunction(container.getScrollable) || !container.getScrollable() || !Ext.isFunction(container.getScrollable().getScroller))return console.warn("Attempting to apply pc scroller to non-container item");
        container.getScrollable().getScroller().setDisabled(true);
        var scrollContainers = Ext.DomQuery.select('.x-scroll-container', container.element.dom);
        var scrollBars = Ext.DomQuery.select('.x-scroll-indicator', container.element.dom);
        for(var i=0;i<scrollContainers.length;i++)
            scrollContainers[i].style.overflow = "auto";
        for(var i=0;i<scrollBars.length;i++)
            scrollBars[i].style.zIndex = "-1";
    }
}
