(function(angular) {
  'use strict';

  var urls = { myList: 'http://expresso.globicon.dk:8580/TEGFacadeJSON/ListMyTodo?callback=JSON_CALLBACK',
               groupList: 'http://expresso.globicon.dk:8580/TEGFacadeJSON/ListMyGroupTodo?callback=JSON_CALLBACK',
               getIncident: 'http://expresso.globicon.dk:8580/TEGFacadeJSON/ViewIncident?callback=JSON_CALLBACK',
               update: 'http://expresso.globicon.dk:8580/TEGFacadeJSON/UpdateIncident' };

  var resources = angular.module('resources', []);

  resources.factory('Incident', ['$http', '$q', function($http, $q) {
    return {
      query : function( filter, params ) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[filter || 'myList'],
                params : params || {}
              }).then(function(response) {
                deferred.resolve( response.data.records.map(function(r) { return r.row; }));
              });

        return deferred.promise;
      },
      get : function(id, params) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[ 'getIncident' ],
                params : angular.extend( {id: id}, params || {} )
              }).then(function(response) {
                var incident = response.data.attributes;
                angular.extend( incident, { history : response.data.history, ready: true });
                deferred.resolve( incident );
              });

        return deferred.promise;
      },
      update : function(update, params) {
        $http({ method: 'POST',
                 url : urls['update'],
                 params : params,
                 data:update }).then(function(response){
                   console.log(response);
                 });
      }
    };
  }]);
})(window.angular);