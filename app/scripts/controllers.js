(function(angular) {
  'use strict';

  var app = angular.module('kuMobileClientApp');

  // Sign in controller
  // -----------------
  app.controller('SignInController',
    ['$scope', '$location', function($scope, $location){

    $scope.signIn = function() {
      $location.path( '/' );
    };
  }]);

  // Incidents Controller
  // --------------------
  app.controller('ListController',
    ['$scope', '$location', 'Resource', function($scope, $location, Resource) {

    $scope.query = function( filter ) {
      $location.hash( filter );

      $scope.filter = filter;
      Resource.query( filter ).then( function( data ) {
        $scope.todos = data;
      });
    };

    $scope.query( $location.hash() || 'mylist' );

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
          $scope.comment = {}
        });
      };

      $scope.back = function( ) {
        $location.path( '/' );
      };
   }]);

})(window.angular);