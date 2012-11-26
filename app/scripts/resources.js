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
    var interceptor = ['$q', 'notify', function ($q, notify) {
      function success( resp ) {
        if ( resp.data.rc && resp.data.rc !== '0') {
          notify( { msg: resp.data.rcMsg, error: true }, 5000 );
        }
        return resp;
      }

      function error( resp ) {
        if ( resp.status !== 404 ) {
          notify( { msg: 'Error resolving request. Contact your System Administrator', error: true } );
        }
        return $q.reject( resp );
      }

      return function ( promise ) {
        return promise.then( success, error );
      };
    }];

    $httpProvider.responseInterceptors.push(interceptor);
  } ] );

  resources.factory('Resource',
    ['$http', '$q', 'notify', function($http, $q, notify) {

    // TODO: rewrite to use transformResponse instead of using custom deferred object

    return {
      query : function( type, params ) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[type || 'mylist'] || urls['mylist'],
                params : params || {}
              }).success(function(data) {
                var records = (data || { } ).records || [];
                deferred.resolve( records.map(function(r) { return r.row; }));
              });

        return deferred.promise;
      },
      get : function(type, id, params, silent) {
        var deferred = $q.defer();

        $http({ method: 'JSONP',
                url: urls[ type || 'incident' ] || urls['incident'],
                params : angular.extend( {id: id}, params || {} ),
                silent: silent
              }).success(function(data) {
                  var todo = ( data || { } ).attributes || [];
                  todo.history = [];

                  // Normalize history - ignore entries with no time
                  var history = data.history || [];
                  angular.forEach( history, function( entry ) {
                    if ( entry.time ) {
                      todo.history.push( entry );
                    }
                  } );

                  angular.extend( todo, { ready: true } );

                  deferred.resolve( todo );
              });

        return deferred.promise;
      },
      update : function( type, data, params ) {
        var deferred = $q.defer();

        $http( { method: 'JSONP',
                url : urls['update' + type || 'incident' ] || urls['updateincident'],
                params : angular.extend( { jsonReq : data }, params ),
                silent : true
               } ).success( function( data ){
                deferred.resolve( data );
              } );
        return deferred.promise;
      },
      create : function( data, params ) {
        var deferred = $q.defer();

        $http( { method: 'JSONP',
                url : urls['newinteraction'],
                params : angular.extend( { jsonReq : data }, params ),
                silent : true
               } ).success( function( data ) {
                 deferred.resolve( data );
              } );
        return deferred.promise;
      }
    };
  }]);
})(window.angular);