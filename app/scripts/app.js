(function( window, angular ) {
  'use strict';

  var app = angular.module('mobileClientApp', ['resources', 'ngSanitize']);

  app.config(['$routeProvider', '$locationProvider',
              function($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/todos/new', {
        templateUrl: 'views/new.html',
        controller: 'NewController'
      })
      .when('/todos/:type', {
        templateUrl: 'views/list.html',
        controller: 'ListController',
        reloadOnSearch:false
      })
      .when('/details/:module/:id', {
        templateUrl: 'views/details.html',
        controller: 'DetailsController',
        reloadOnSearch:false
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SignInController'
      })
      .when().otherwise({
        redirectTo: '/todos/my'
      });
  }]);

  app.filter('vagueTime', function() {
    return function(input) {
      return window.vagueTime.get({ from : input, units:'ms' });
    };
  });

  app.filter( 'newline', function() {
    return function(input) {
      return input && input
        .replace( '<', '&lt;' )
        .replace( '>', '&gt;' )
        .replace(/\n/g, '<br/>');
    };
  });
})( window, window.angular );