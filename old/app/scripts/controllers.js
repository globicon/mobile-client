(function(angular) {
  'use strict';

  var app = angular.module('mobileClientApp');

  //
  // Sign in controller
  // -----------------
  app.controller('SignInController',
    ['$scope', '$location', 'Resource', '$cookies', '$filter',
     function( $scope, $location, Resource, $cookies, $filter ){

    function clearCookies() {
      $cookies.user = undefined;
      $cookies.loginDate = undefined;
    }

    if ( $cookies.user ) {
      Resource.logout().success( function() {
        clearCookies();
      });
    }

    $scope.$root.isSigningIn = true;
    $scope.$root.my = $scope.$root.group = undefined;

    $scope.signIn = function() {

      var login = Resource.login( $scope.user, $scope.pass || '' )
        .success( function() {
        $cookies.user = $scope.user;
        $cookies.loginDate = $filter( 'date')( new Date(), 'HH:MM' );
        $scope.loginError = undefined;
        $location.path( '/' );
        $scope.$root.isSigningIn = false;
      }).error( function( msg ) {
        $scope.loginError = msg;
        clearCookies();
      });
    };
  }]);

  //
  // NavController
  // -------------
  app.controller( 'NavController',
    ['$scope', '$routeParams', '$location', '$filter', '$cookies', 'notify', 'Resource',
      function( $scope, $routeParams, $location, $filter, $cookies, notify, Resource ) {

        function capitalize( str ) {
          return angular.uppercase( str[0] ) + str.slice( 1 );
        }
        function count( type ) {
          return $scope.$root[type] ?
            '<span class="badge">' + $scope.$root[type].length + '</span>' :
            '';
        }
        function detailHeader( id, type ) {
          return { title : id, prev : { title: capitalize( type ), href: '#/todos/' + type } };
        }

        // When route changes - update page header
        $scope.$on( '$routeChangeSuccess', function () {
          notify( 'hide' );

          if ( !$cookies.user && $location.path() !== '/signin' ) {
            $location.path( '/signin' );
            return;
          }
          var home = { href: '#', title: 'Home' },
              loginTitle = $cookies.user + ' - ' + $cookies.loginDate,
              headers = {
                'home' : { title: loginTitle, prev: undefined },
                '/todos/new' : { title : 'New', prev: home },
                'my': { title: 'My Todos' + count( 'my' ), prev: home },
                'group': { title: 'My Group Todos' + count( 'group' ), prev: home },
                'search': { title: 'Search' + count( 'search' ), prev: home },
                '/signin' : { title: 'Sign in' }
              },
              type = $routeParams.type,
              id = $routeParams.id;

            $scope.header = id ? detailHeader(id, type ) :
              headers[type] || headers[ $location.path() ] || headers.home;

            // call refresh on startup when my and group hasn't been loaded
            if ( !$scope.$root.my && !$scope.$root.group ) {
              refresh();
            }
        } );

        // refresh loading todos
        function refresh() {

          function query( type ) {
            Resource.query( type ).then( function( data ) {
              $scope.$root[type] = data;
              if ( $routeParams.type === type ) {
                $scope.header.title += '<span class="badge">' + data.length + '</span>';
              }
            });
          }

          if ( $location.path() === '/signin' ) {
            $scope.$root.my = $scope.$root.group = $scope.$root.search = undefined;
          } else {
            // fetch my and group todos on refresh
            query( 'my' );
            query( 'group' );
            query( 'resolutionCodeList' );
            query( 'templateList' );
          }
        }

        $scope.refresh = refresh;
    }]);

  app.controller( 'IndexController',
    ['$scope',  function( $scope, Resource ) {
      if ( $scope.$root.alert ) {
        $scope.alert = $scope.$root.alert;
        $scope.$root.alert = null;
      }
      $scope.$root.search = undefined;
      $scope.$root.searchParams = {};
    }]);

  //
  // Todos Controller
  // --------------------
  app.controller('ListController',
    ['$scope', '$location', '$routeParams', 'Resource',
     function($scope, $location, $routeParams, Resource) {

    $scope.type = $routeParams.type || 'my';
    $scope.$root.searchParams = $scope.$root.searchParams || {};

    // watch if the current type of todo changes then update todos
    // to update binding
    $scope.$watch( $scope.type, function() {
      var todos = $scope.$root[$scope.type];
      $scope.todos = angular.isArray( todos ) ? todos : [];
    });

    $scope.search = function( ) {
      var params = $scope.$root.searchParams;

      $scope.todos = undefined;
      $scope.noResults = false;

      // do not search if no search term is specified
      if ( !params.id &&
           !params.contact &&
           !params.assignmentGroup ) {

        return;
      }

      Resource.query( $scope.type, params ).then( function( data ) {
        var searchCount = (data||[]).length;

        $scope.$root.search = $scope.todos = data;
        $scope.noResults = searchCount === 0;
        $scope.$parent.header.title = 'Search';
        if ( !$scope.noResults ) {
          $scope.$parent.header.title += '<span class="badge">' + searchCount + '</span>';
        }
      });
    };

    $scope.clearSearch = function() {
      $scope.$root.searchParams = {};
      $scope.todos = $scope.$root.search = undefined;
    };

    $scope.details = function( module, id ) {
      $location.path( '/todos/' + $scope.type + '/' + module + '/' + id );
    };
  }]);

  //
  // Details Controller
  // ------------------
  var DetailsController = app.controller( 'DetailsController',
    ['$scope', '$routeParams', '$location', 'Resource',
     function( $scope, $routeParams, $location, Resource ) {
       var id = $routeParams.id,
           module = ( $scope.module = $routeParams.module );

       $scope.id = id;
       $scope.comment = {};
       $scope.todo = {};


       Resource.get( module, id ).then( function( todo ) {
         $scope.todo = todo;
       });

       $scope.update = function( kind ) {
         var update = { id: id,
                        visibleToCustomer: $scope.comment.visibleToCustomer ? 'yes' : 'no',
                        closureCode : $scope.comment.closureCode };
         $scope.updating = true;
         $scope.alert = undefined;

         // update kind can be 'update' or 'resolution', same API is called
         // with different object
         update[kind] = $scope.comment.text;

         Resource.update( module, update ).then( function( data ) {
           // reload list of history silently if update was successful
           Resource.get( module, id, {}, true ).then( function( todo ) {
             if ( data.rc === '0' ) {
               $scope.alert = data.rcMsg;
             }
             $scope.updating = false;
             $scope.todo.history = todo.history;
             $scope.comment = {};
           });
         });
       };
     }]);

  // New Controller
  // ------------------
  var NewController = app.controller( 'NewController',
    ['$scope', '$location', '$cookies', 'Resource',
      function( $scope, $location, $cookies, Resource ) {

      function resetContact() {
        $scope.newInteraction.contact = $scope.me ? $cookies.user : undefined;
      }

      $scope.newInteraction = {};

      $scope.$watch( 'me', resetContact );

      $scope.me = false;

      $scope.create = function() {
        $scope.alert = undefined;

        Resource.create( $scope.newInteraction ).then( function( data ) {
          if ( data.rc === '0' ) {
            $scope.$root.alert = data.rcMsg;
            $location.path( '/' );
          }
        } );
      };
    }]);

})(window.angular);