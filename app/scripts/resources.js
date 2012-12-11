(function(angular) {
  'use strict';

  var baseUrl = 'http://expresso.globicon.dk:8580/TEGFacadeJSON/';

  var urls = { search:          baseUrl + 'SearchRecords'   ,
               my:              baseUrl + 'ListMyTodo'      ,
               group:           baseUrl + 'ListMyGroupTodo' ,
               incident:        baseUrl + 'ViewIncident'    ,
               workorder:       baseUrl + 'ViewWorkorder'   ,
               interaction:     baseUrl + 'ViewInteraction' ,
               updateincident:  baseUrl + 'UpdateIncident'  ,
               updateworkorder: baseUrl + 'UpdateWorkorder' ,
               newinteraction:  baseUrl + 'NewInteraction'  ,
               login:           baseUrl + 'Login',
               logout:          baseUrl + 'Logout' };

  var resources = angular.module('resources', []);

  resources.config( ['$httpProvider', function($httpProvider) {

    // inject error handling into $q, TODO: do more with 401s AUTH
    var interceptor = ['$q', 'notify', '$location', function ( $q, notify, $location ) {
      function success( resp ) {
        if ( resp.data.rc && resp.data.rc !== '0') {
          notify( { msg: resp.data.rcMsg, error: true }, 4000 );
        }
        return resp;
      }

      function error( resp ) {
        if ( resp.status === 401 ) {
          $location.path();
          if ( $location.path() !== '/signin' ) {
            window.location.href = '#/signin';
            notify( { msg: 'Unauthorized access. Please signin', error: true }, 4000 );
          }
        }
        else if ( resp.status !== 404 ) {
          notify( { msg: 'Error resolving request. Contact your System Administrator', error: true }, 4000 );
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
      login : function( user, pass ) {
        return $http({ method: 'GET',
                url: urls['login'],
                params : { user: user, pw: pass }
              });
      },
      logout : function( ) {
        return $http({ method: 'GET',
                url: urls['logout']
              });
      },
      query : function( type, params ) {
        var deferred = $q.defer();

        $http({ method: 'GET',
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

        $http({ method: 'GET',
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

        $http( { method: 'POST',
                url : urls['update' + type || 'incident' ] || urls['updateincident'],
                params : params,
                data : data,
                silent : true
               } ).success( function( data ){
                deferred.resolve( data );
              } );
        return deferred.promise;
      },
      create : function( data, params ) {
        var deferred = $q.defer();

        $http( { method: 'POST',
                url : urls['newinteraction'],
                params : params,
                silent : true,
                data : data
               } ).success( function( data ) {
                 deferred.resolve( data );
              } );
        return deferred.promise;
      }
    };
  }]);
})(window.angular);