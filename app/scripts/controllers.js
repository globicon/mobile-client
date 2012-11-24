(function(angular) {
  'use strict';

  var app = angular.module('mobileClientApp');

  //
  // Sign in controller
  // -----------------
  app.controller('SignInController',
    ['$scope', '$location', function($scope, $location){

    $scope.signIn = function() {
      $location.path( '/' );
    };
  }]);

  //
  // NavController
  // -------------
  app.controller( 'NavController',
    ['$scope', '$routeParams', '$location', 'Resource',
      function( $scope, $routeParams, $location, Resource ) {

        function capitalize( str ) {
          return angular.uppercase( str[0] ) + str.slice( 1 );
        }
        function count( type ) {
          return $scope.$root[type] ?
            '<span class="badge">' + $scope.$root[type].length + '</span>' :
            '';
        }

        $scope.$on( '$routeChangeSuccess', function () {
          var home = { href: '#', title: 'Home' },
              headers = {
                home : { title: 'User', prev: undefined },
                '/todos/new' : { title : 'New', prev: home },
                my: { title: 'My Todos' + count( 'my' ), prev: home },
                group: { title: 'My Group Todos' + count( 'group' ), prev: home },
                search: { title: 'Search', prev: home }
              },
              type = $routeParams.type,
              id = $routeParams.id;

            $scope.header = id ?
              { title : id,
                prev : { title: capitalize( type ), href: '#/todos/' + type } } :
              headers[type] || headers[ $location.path() ] || headers['home'];
        } );

        function refresh() {
          $scope.$root.loading = 2;

          function query( type ) {
            Resource.query( type ).then( function( data ) {
              $scope.$root[type] = data;
              $scope.$root.loading--;
              if ( $routeParams.type === type ) {
                $scope.header.title += '<span class="badge">' + data.length + '</span>';
              }
            });
          }

          query( 'my' );
          query( 'group' );
        }

        if ( !$scope.$root.my && !$scope.$root.group ) {
          refresh();
        }

        $scope.refresh = refresh;
    }]);

  app.controller( 'IndexController',
    ['$scope',  function( $scope, Resource ) {


    }]);

  //
  // Todos Controller
  // --------------------
  app.controller('ListController',
    ['$scope', '$location', '$routeParams', 'Resource',
     function($scope, $location, $routeParams, Resource) {

    $scope.type = $routeParams.type || 'my';
    $scope.$root.search = $scope.$root.search || {};

    // watch if the current type of todo changes then update todos
    // to update binding
    $scope.$watch( $scope.type, function() {
      var todos = $scope.$root[$scope.type];
      $scope.todos = angular.isArray( todos ) ? todos : [];
    });

    $scope.query = function( ) {
      var params = {};

      $scope.loading = true;
      Resource.query( $scope.type, params ).then( function( data ) {
        $scope.todos = data;
        $scope.loading = false;
      });
    };

    $scope.clearSearch = function() {
      $scope.$root.search = {};
      $scope.todos = undefined;
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

       $scope.loading = true;

       Resource.get( module, id ).then( function( todo ) {
         $scope.todo = todo;
        $scope.loading = false;
       });

       $scope.update = function( kind ) {
         var update = { id: id,
                        visibleToCustomer: $scope.comment.visibleToCustomer ? 'yes' : 'no',
                        closureCode : $scope.comment.closureCode };
         // update kind can be 'update' or 'resolution', same API is called
         // with different object
         update[kind] = $scope.comment.text;

         Resource.update( module, update ).then( function( data ) {
           // reload list of history if update was successful
           Resource.get( module, id ).then( function( todo ) {
             $scope.todo.history = todo.history;
             $scope.comment = {};
           });
         });
       };
     }]);

  // New Controller
  // ------------------
  var NewController = app.controller( 'NewController',
    ['$scope', '$location', 'Resource',
      function( $scope, $location, Resource ) {

      $scope.create = function() {
        Resource.create( $scope.newInteraction ).then( function( data ) {
          $scope.newInteraction = {};
        } );
      };

      $scope.back = function( ) {
        $location.path( '/' );
      };
    }]);

})(window.angular);