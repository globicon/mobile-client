Ext.define( 'MobileClient.Authentication', {

  mixins: ['Ext.mixin.Observable'],

  config : {
    url : undefined,
    logoutUrl : undefined
  },

  constructor : function( config ) {
    this.initConfig( config );
  },

  authenticate : function( config ) {
    var that = this;

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
        that.fireEvent( 'authenticated' );
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

  clear : function() {
    Cookies.set( 'user' );
    Cookies.set( 'loginTime' );
  },

  logout : function() {
    var that = this;

    Ext.Ajax.request( {
      url: this.getLogoutUrl(),
      method : 'GET', // TODO: change to POST
      disableCaching : false,
      withCredentials: true,
      success : function() {
        that.fireEvent( 'loggedOut' );
        that.clear();
      }
    } );
  }
} );