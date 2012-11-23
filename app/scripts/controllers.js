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
    ['$scope', '$routeParams', '$location', function( $scope, $routeParams, $location ) {

      $scope.$on( '$routeChangeSuccess', function () {
        var home = { href: '#', title: 'Home' },
            headers = {
              home : { title: 'User', prev: undefined },
              '/todos/new' : { title : 'New', prev: home },
              my: { title: 'My Todos', prev: home },
              group: { title: 'My Group Todos', prev: home },
              search: { title: 'Search', prev: home }
            },
            type = $routeParams.type,
            id = $routeParams.id;

        if ( id ) {
          $scope.header = { title : id, prev : {
            title: angular.uppercase( type[0] ) + type.slice( 1 ), href: '#/todos/' + type
          } };
        }
        else {
          $scope.header = headers[type] || headers[ $location.path() ] || headers['home'];
        }
      } );

      $scope.header = {};
    }]);

  app.controller( 'IndexController',
    ['$scope', function( $scope ) {

      $scope.header.title = 'User';
    }]);

  //
  // Todos Controller
  // --------------------
  app.controller('ListController',
    ['$scope', '$location', '$routeParams', 'Resource',
     function($scope, $location, $routeParams, Resource) {

    $scope.type = $routeParams.type || 'my';
    $scope.$root.search = $scope.$root.search || {};

    $scope.query = function( ) {
      var params = {};

      if ( $scope.type === 'search' ) {
        params = $scope.$root.search;

        // do not search if no search term is specified
        if ( !$scope.$root.search.id &&
             !$scope.$root.search.contact &&
             !$scope.$root.search.assignmentGroup ) {

          $scope.todos = undefined;
          return;
        }
      }

      $scope.loading = true;
      Resource.query( $scope.type, params ).then( function( data ) {
        $scope.todos = data;
        $scope.loading = false;
      });
    };

    $scope.query( );

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

       $scope.comment = {};
       $scope.todo = {};

       Resource.get( module, id ).then( function( todo ) {
         $scope.todo = todo;
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