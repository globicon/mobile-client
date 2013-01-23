Ext.define( 'MobileClient.view.Details', {
  extend: 'Ext.Panel',

  requires: ['Ext.DateExtras'],

  xtype: 'settings',

  config : {
    model : null,
    styleHtmlContent: true,
    tpl : Ext.XTemplate( '<p>{description}</p>' ),

    items: [
    {
      xtype : 'panel',
      html : 'Loading Details'
    }]
  },

  initialize : function() {
    var model = this.getModel(),
        detailsPanel = this.items.get(0),
        tpl = this.getTpl();
    if ( model ) {
      detailsPanel.setHtml( tpl.apply( model.getData() ) );
      model.on( { 'loaded' : function() {
        detailsPanel.setHtml( tpl.apply( model.getData() ) );
      } } );
    }
  }
});