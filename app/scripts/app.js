(function( window, angular ) {
  'use strict';

  var app = angular.module('kuMobileClientApp', ['resources']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/incidents.html',
        controller: 'IncidentsController'
      })
      .when('/details/:id', {
        templateUrl: 'views/details.html',
        controller: 'DetailsController'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SignInController'
      })
      .when().otherwise({
        redirectTo: '/'
      });
  }]);

  app.filter('vagueTime', function() {
    return function(input) {
      return window.vagueTime.get({ from : input, units:'ms' });
    };
  });
})( window, window.angular );