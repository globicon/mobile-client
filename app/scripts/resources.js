(function( angular ) {
  'use strict';

  var urls = { myList : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeListMyTodo?callback=JSON_CALLBACK',
               groupList : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeListMyGroupTodo?callback=JSON_CALLBACK',
               single : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeViewIncident?callback=JSON_CALLBACK',
               update : 'http://expresso.globicon.dk:8580/TEGFacadeJSON/TegJsonFacadeUpdateIncident?callback=JSON_CALLBACK' };

  var resources = angular.module('resources', []);

  resources.factory( 'Incident',
    [ '$http', '$q', function( $http, $q ) {
    return {
      query : function( filter, params ) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[ filter || 'myList' ],
                params : params || {}
              }).then(function(response) {
                deferred.resolve(
                  response.data.records.map(
                    function(r) { return r.row; }));
              });

        return deferred.promise;
      }
    };
  }]);
})( window.angular );