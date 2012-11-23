(function( window, angular ) {
  'use strict';

  var app = angular.module('mobileClientApp', ['resources', 'ngSanitize']);

  app.config(['$routeProvider', '$locationProvider',
              function($routeProvider, $locationProvider ) {
    $routeProvider
      .when( '/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      } )
      .when('/todos/new', {
        templateUrl: 'views/new.html',
        controller: 'NewController'
      })
      .when('/todos/:type', {
        templateUrl: 'views/list.html',
        controller: 'ListController',
        reloadOnSearch:false
      })
      .when('/todos/:type/:module/:id', {
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

  app.filter( 'newline', function() {
    return function(input) {
      return input && input
        .replace( '<', '&lt;' )
        .replace( '>', '&gt;' )
        .replace(/\n/g, '<br/>');
    };
  });

  app.factory( 'notify', ['$rootScope', function( $rootScope ) {
    $rootScope.notification = { hide : true };
    return function( notification, fadeIn ) {
      $rootScope.notification = notification;

      // remove notification after fadeIn millis
      if ( fadeIn && fadeIn > 0 ) {
        setTimeout( function() {
          $rootScope.notification.hide = true;
          $rootScope.$apply();
        },
        fadeIn );
      }
    };
  }]);
})( window, window.angular );