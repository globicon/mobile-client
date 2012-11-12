(function(angular) {
  'use strict';

  var app = angular.module('kuMobileClientApp');

  // Signi n controller
  // -----------------
  app.controller('SignInController',
    ['$scope', '$location', function($scope, $location){

    $scope.signIn = function() {
      $location.path( '/' );
    };
  }]);

  // Incidents Controller
  // --------------------
  app.controller('IncidentsController',
    ['$scope', '$location', 'Incident', function($scope, $location, Incident) {

    $scope.queryIncidents = function( filter ) {
      $location.hash( filter );

      $scope.filter = filter;
      Incident.query( filter, { user: 'pk', pw: '' } )
        .then( function( data ) {
          $scope.incidents = data;
        });
    };

    $scope.queryIncidents( $location.hash() || 'myList' );

    $scope.details = function( id ) {
      $location.path( '/details/' + id );
    };
  }]);

  // Details Controller
  // ------------------
  var DetailsController = app.controller( 'DetailsController',
    ['$scope', '$routeParams', '$location', 'Incident',
     function( $scope, $routeParams, $location, Incident ) {

      $scope.comment = {};

      $scope.incident = Incident.get( $routeParams.id, { user: 'pk', pw: '' } );

      $scope.update = function() {
        var update = { id: $scope.incident.id,
                       update: $scope.comment.text,
                       visibleToCustomer: $scope.comment.visibleToCustomer ? 'yes' : 'no',
                       closureCode : $scope.comment.closureCode };
        Incident.update( update, { user: 'pk', pw: '' } );
      };

      $scope.resolve = function() {
        console.log( 'resolve:', $scope.comment );
      };

      $scope.back = function( ) {
        $location.path( '/' );
      };
   }]);

})(window.angular);