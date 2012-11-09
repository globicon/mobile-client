(function( angular ) {
  'use strict';

  var urls = { myList : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeListMyTodo?callback=JSON_CALLBACK',
               groupList : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeListMyGroupTodo?callback=JSON_CALLBACK',
               single : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeViewIncident?callback=JSON_CALLBACK',
               update : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeUpdateIncident?callback=JSON_CALLBACK' };

  var resources = angular.module('resources', []);

  resources.factory( 'Incident', function( $http ) {
    return {
      query : function( filter, params ) {
        var incidents = {records : []};

        $http({ method: 'JSONP',
                url: urls[ filter || 'myList' ],
                params : params || {}
              }).then(function(response) {
                incidents.records = response.data.records.map( function( r ) { return r.row; } );
              });

        return incidents;
      }
    };
  });
})( window.angular );