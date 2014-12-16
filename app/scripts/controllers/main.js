'use strict';

/**
 * @ngdoc function
 * @name santaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the santaApp
 */
angular.module('santaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
