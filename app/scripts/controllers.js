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
      $scope.filter = filter;
      Incident.query( filter, { user: 'pk', pw: '' } )
        .then( function( data ) {
          $scope.incidents = data;
        });
    };

    $scope.queryIncidents( 'myList' );

    $scope.details = function( id ) {
      $location.path( '/details/' + id );
    };
  }]);

})(window.angular);