(function(angular) {
  'use strict';

  var baseUrl = 'http://expresso.globicon.dk:8580/TEGFacadeJSON/',
      callback = '?callback=JSON_CALLBACK&user=pk&pw=';

  var urls = { search:          baseUrl + 'SearchRecords'   + callback,
               my:              baseUrl + 'ListMyTodo'      + callback,
               group:           baseUrl + 'ListMyGroupTodo' + callback,
               incident:        baseUrl + 'ViewIncident'    + callback,
               workorder:       baseUrl + 'ViewWorkorder'   + callback,
               interaction:     baseUrl + 'ViewInteraction' + callback,
               updateincident:  baseUrl + 'UpdateIncident'  + callback,
               updateworkorder: baseUrl + 'UpdateWorkorder' + callback,
               newinteraction:  baseUrl + 'NewInteraction'  + callback };

  var resources = angular.module('resources', []);

  resources.config( ['$httpProvider', function($httpProvider) {

    // inject error handling into $q, TODO: do more with 401s AUTH
    var interceptor = ['$rootScope', '$q', 'notify', function (scope, $q, notify) {
      function success(resp) {
        if ( resp.data.rc !== '0' ) {
          notify( resp.data.rcMsg, 5000 );
        }
        return resp;
      }

      function error(resp) {
        if (resp.status !== 404) {
          notify( 'Error resolving request. Contact your System Administrator' );
        }
        return $q.reject(resp);
      }

      return function (promise) {
        return promise.then(success, error);
      };
    }];

    $httpProvider.responseInterceptors.push(interceptor);
  } ] );

  resources.factory('Resource',
    ['$http', '$q', 'notify', function($http, $q, notify) {

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
      },
      create : function(data, params) {
          var deferred = $q.defer();

        $http({ method: 'JSONP',
                url : urls['newinteraction'],
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