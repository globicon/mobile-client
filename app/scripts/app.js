(function( window, angular ) {
  'use strict';

  var app = angular.module('kuMobileClientApp', ['resources', 'ngSanitize']);

  app.config(['$routeProvider', '$locationProvider',
              function($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListController',
        reloadOnSearch:false
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'NewController'
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
        redirectTo: '/'
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