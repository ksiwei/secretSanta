'use strict';

/**
 * @ngdoc function
 * @name santaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the santaApp
 */
angular.module('santaApp')
  .controller('LoginCtrl', function ($scope, AuthService, $rootScope, $location) {
  	$scope.hasStatus = false;
  	$scope.isLogin = false;
  	AuthService.checkStatus(function() {
  		$scope.isLogin = true;
  		$scope.hasStatus = true;
  		$scope.$apply();
  	},
  	function() {
  		$scope.isLogin = false;
  		$scope.hasStatus = true;
  		$scope.$apply();

  	});
	$scope.login = AuthService.login;


  });
