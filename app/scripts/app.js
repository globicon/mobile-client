(function( angular ) {
  'use strict';

var app = angular.module('kuMobileClientApp', ['resources'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/incidents.html',
        controller: 'IncidentsController'
      } )
      .when('/details/:id', {
        templateUrl: 'views/details.html',
        controller: 'DetailsController'
      } )
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SignInController'
      })
      .when( )
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
  }]);
})( window.angular );