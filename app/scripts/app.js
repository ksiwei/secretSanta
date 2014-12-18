'use strict';

/**
 * @ngdoc overview
 * @name santaApp
 * @description
 * # santaApp
 *
 * Main module of the application.
 */
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1583515518538640',
    xfbml      : true,
    version    : 'v2.2'
  });
  angular
    .module('santaApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
};

