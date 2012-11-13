(function( window, angular ) {
  'use strict';

  var app = angular.module('kuMobileClientApp', ['resources']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListController'
      })
      .when('/details/:module/:id', {
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