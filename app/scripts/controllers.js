(function(angular) {
  'use strict';

  var app = angular.module('mobileClientApp');

  app.controller( 'NavController',
    ['$scope', '$routeParams', function( $scope, $routeParams ) {

      $scope.$on( '$routeChangeSuccess', function () {
        $scope.active = $routeParams.type || $scope.active;
      } );
    }]);

  // Sign in controller
  // -----------------
  app.controller('SignInController',
    ['$scope', '$location', function($scope, $location){

    $scope.signIn = function() {
      $location.path( '/' );
    };
  }]);

  // Todos Controller
  // --------------------
  app.controller('ListController',
    ['$scope', '$location', '$routeParams', 'Resource',
     function($scope, $location, $routeParams, Resource) {

    $scope.$root.search = $scope.$root.search || {};

    $scope.query = function( filter ) {
      var params = {};

      if ( $routeParams.type === 'search' ) {
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
      Resource.query( $routeParams.type, params ).then( function( data ) {
        $scope.todos = data;
        $scope.loading = false;
      });
    };

    $scope.query( $routeParams.type || 'my', $scope.search );

    $scope.clearSearch = function() {
      $scope.$root.search = {};
      $scope.todos = undefined;
    };

    $scope.details = function( module, id ) {
      $location.path( '/details/' + module + '/' + id );
    };
  }]);

  // Details Controller
  // ------------------
  var DetailsController = app.controller( 'DetailsController',
    ['$scope', '$routeParams', '$location', 'Resource',
     function( $scope, $routeParams, $location, Resource ) {
      var id = $routeParams.id,
          module = ( $scope.module = $routeParams.module );

      $scope.comment = {};

      $scope.todo = Resource.get( module, id );

      $scope.update = function( kind ) {
        var update = { id: id,
                       visibleToCustomer: $scope.comment.visibleToCustomer ? 'yes' : 'no',
                       closureCode : $scope.comment.closureCode };
        // update kind can be 'update' or 'resolution', same API is called
        // with different object
        update[kind] = $scope.comment.text;

        Resource.update( module, update ).then( function() {
          $scope.todo = Resource.get( module, id );
          $scope.comment = {};
        });
      };

      $scope.back = function( ) {
        $location.path( '/' );
      };
   }]);

  // New Controller
  // ------------------
 var NewController = app.controller( 'NewController',
    ['$scope', '$location', 'Resource', function( $scope, $location, Resource ) {

      $scope.$parent.active = 'new';

      $scope.create = function() {
        Resource.create( $scope.newInteraction ).then( function( data ) {
          $scope.creationResult = data;
          if ( data.rc === '0' ) {
            $scope.newInteraction = {};
          }
        } );
      };

      $scope.back = function( ) {
        $location.path( '/' );
      };
    }]);

})(window.angular);