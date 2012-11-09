(function(angular) {
  'use strict';

  var app = angular.module('kuMobileClientApp');

  // Signi n controller
  // -----------------
  app.controller('SignInController', function($scope, $location){

    $scope.signIn = function() {
      $location.path( '/' );
    };
  });

  // Incidents Controller
  // --------------------
  app.controller('IncidentsController', function($scope, Incident) {
    $scope.queryIncidents = function( filter ) {
      $scope.filter = filter;
      $scope.incidents = Incident.query( filter, { user: 'pk', pw: '' } );
    };

    $scope.queryIncidents( 'myList' );
  });

})(window.angular);