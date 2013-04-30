(function( Ext ){
  'use strict';

  Ext.define( 'MobileClient.plugin.PullRefreshAll', {
    extend: 'Ext.plugin.PullRefresh',
    requires : ['Ext.plugin.PullRefresh'],
    alias: 'plugin.pullrefreshall',

    // just override all items when new are fetch
    onLatestFetched: function(operation) {
      var list            = this.getList(),
          store           = list.getStore(),
          scroller        = list.getScrollable().getScroller(),
          scrollerOffsetX = scroller.position.x,
          scrollerOffsetY = scroller.position.y,
          newRecords      = operation.getRecords();

      store.setData(newRecords);
      scroller.scrollTo(scrollerOffsetX, scrollerOffsetY);

      this.setViewState('loaded');
      this.fireEvent('latestfetched');
      if (this.getAutoSnapBack()) {
        this.snapBack();
      }
    }
  } );
})( window.Ext );