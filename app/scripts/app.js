(function( window, angular ) {
  'use strict';

  var app = angular.module('mobileClientApp', ['resources', 'ngCookies']);

  app.config(['$routeProvider', '$locationProvider',
              function($routeProvider, $locationProvider) {
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
        redirectTo: '/signin'
      });
  }]);

  app.filter( 'newline', function() {
    return function(input) {
      return input && input.split( '\n' );
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

  app.directive( 'hideWhenLoading', ['$http', function( $http ) {
   return {
      replace : true,
      restrict: 'A',
      link : function( scope, element, attr ) {
        function totalActiveAjaxRequests() {
          var activeRequests = 0;
          angular.forEach( $http.pendingRequests, function( r ) {
            // filter out requests marked as silent
            if ( !r.silent ) {
              activeRequests++;
            }
          } );
          return activeRequests;
        }

        scope.$watch( totalActiveAjaxRequests, function() {
          element.css( 'display', totalActiveAjaxRequests() === 0 ? 'block' : 'none' );
        } );
      }
    };
  }]);

  app.directive( 'loadingProgress', ['$http', function( $http ) {
    return {
      replace : true,
      restrict: 'E',
      scope : {
        lead : '@'
      },
      link : function( scope, element, attrs ) {
        function totalActiveAjaxRequests() {
           return $http.pendingRequests.length;
        }

        scope.$watch( totalActiveAjaxRequests, function() {
          scope.loading = totalActiveAjaxRequests();
        } );
      },
      template : '<div ng-show="loading">' +
                  '<p class="lead" ng-show="lead">{{lead}}</p>' +
                  '<div class="progress progress-striped active">' +
                    '<div class="bar" style="width:100%"></div>' +
                  '</div>' +
                '</div>'

    };
  }]);
})( window, window.angular );