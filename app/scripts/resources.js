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
    function success(resp) {
      return resp.data.rc === "0";
    }

    return {
      query : function( type, params ) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[type || 'mylist'] || urls['mylist'],
                params : params || {}
              }).then(function(resp) {
                if ( success(resp) ) {
                  // unwrap objects from row wrapper
                  // [{row: {id:5,..}}, {row...}] -> [{id:5,..},..]
                  deferred.resolve( resp.data.records.map(function(r) { return r.row; }));
                }
              });

        return deferred.promise;
      },
      get : function(type, id, params) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[ type || 'incident' ] || urls['incident'],
                params : angular.extend( {id: id}, params || {} )
              }).then(function(resp) {
                if (success(resp)) {
                  var todo = resp.data.attributes;
                  angular.extend( todo, { history : resp.data.history, ready: true });
                  deferred.resolve( todo );
                }
              });

        return deferred.promise;
      },
      update : function(type, data, params) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url : urls['update' + type || 'incident' ] || urls['updateincident'],
                params : angular.extend( { jsonReq : data }, params )
               }).then(function(resp){
                  if (success(resp)) {
                    deferred.resolve(resp.data);
                  }
              });
        return deferred.promise;
      }
    };
  }]);
})(window.angular);