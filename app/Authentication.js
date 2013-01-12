Ext.define( 'MobileClient.Authentication', {

  config : {
    url : undefined
  },

  constructor : function( config ) {
    this.initConfig( config );
  },

  authenticate : function( config ) {
    Ext.Ajax.request( {
      url: this.getUrl(),
      method : 'GET', // TODO: change to POST
      disableCaching : false,
      withCredentials: true,

      params: {
        user: config.user,
        pw: config.pass
      },

      success: function( response ) {
        Cookies.set( 'user', config.user );
        Cookies.set( 'loginTime', new Date() );
        ( config.success || function() {} )( response );
      },

      failure : function( response ) {
        ( config.failure || function() {} )( response );
      }
    } );
  },

  getAuthInfo : function() {
    return { user: Cookies.get( 'user' ),
             date : new Date( Cookies.get( 'loginTime' ) ) };
  },


  isAuthenticated : function() {
    return Cookies.get( 'user' );
  },

  logout : function() {
    Cookies.set( 'user' );
    Cookies.set( 'loginTime' );
    // TODO: call logout service
  }
} );