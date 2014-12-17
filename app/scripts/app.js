'use strict';

/**
 * @ngdoc overview
 * @name santaApp
 * @description
 * # santaApp
 *
 * Main module of the application.
 */
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
