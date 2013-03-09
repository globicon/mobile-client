(function( Ext ){
  'use strict';

  Ext.define( 'MobileClient.store.LoadAwareStore', {
    extend : 'Ext.data.Store',

    config : {
      model: undefined
    },

    loaded : false,

    isLoaded : function() {
      return this.loaded;
    },

    ensureLoaded: function() {
      if ( !this.isLoaded() ) {
        this.load();
      }
    },

    initialize : function() {
      var that = this;
      this.on( 'load', function() {
        that.loaded = true;
      } );
      this.on( 'clear', function() {
        that.loaded = false;
      } );
    }
  } );

})( window.Ext );