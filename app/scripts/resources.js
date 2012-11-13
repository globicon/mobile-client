(function(angular) {
  'use strict';

  var baseUrl = 'http://expresso.globicon.dk:8580/TEGFacadeJSON/',
      callback = '?callback=JSON_CALLBACK&user=pk&pw=';

  var urls = { search:          baseUrl + 'SearchRecords'   + callback,
               mylist:          baseUrl + 'ListMyTodo'      + callback,
               grouplist:       baseUrl + 'ListMyGroupTodo' + callback,
               incident:        baseUrl + 'ViewIncident'    + callback,
               workorder:       baseUrl + 'ViewWorkorder'   + callback,
               interaction:     baseUrl + 'ViewInteraction' + callback,
               updateincident:  baseUrl + 'UpdateIncident'  + callback,
               updateworkorder: baseUrl + 'UpdateWorkorder' + callback };

  var resources = angular.module('resources', []);

  resources.factory('Resource', ['$http', '$q', function($http, $q) {
    return {
      query : function( type, params ) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[type || 'mylist'],
                params : params || {}
              }).then(function(response) {
                deferred.resolve( response.data.records.map(function(r) { return r.row; }));
              });

        return deferred.promise;
      },
      get : function(type, id, params) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[ type || 'incident' ],
                params : angular.extend( {id: id}, params || {} )
              }).then(function(response) {
                var incident = response.data.attributes;
                angular.extend( incident, { history : response.data.history, ready: true });
                deferred.resolve( incident );
              });

        return deferred.promise;
      },
      update : function(type, data, params) {
        $http({ method: 'JSONP',
                 url : urls['update' + type || 'incident' ],
                 params : angular.extend( { jsonReq : data }, params )
               }).then(function(response){
                   console.log(response);
                 });
      }
    };
  }]);
})(window.angular);