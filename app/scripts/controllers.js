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
    ['$scope', 'Incident', function($scope, Incident) {
    $scope.queryIncidents = function( filter ) {
      $scope.filter = filter;
      Incident.query( filter, { user: 'pk', pw: '' } )
        .then( function( data ) {
          $scope.incidents = data;
        });
    };

    $scope.queryIncidents( 'myList' );
  }]);

})(window.angular);