'use strict';

/**
 * @ngdoc function
 * @name santaApp.controller:AboutCtrl
 * @description
 * Controller of the santaApp
 */
angular.module('santaApp')
  .controller('LoginCtrl', function ($scope, AuthService, DBService, $rootScope, $http) {
  	$scope.hasStatus = false;
  	$scope.isLogin = false;
  	AuthService.checkStatus();
	$scope.login = AuthService.login;

  	$scope.$on("Auth", function(e, arg) {
  		$scope.isLogin = (arg.status === "connected");
  		$scope.hasStatus = true;
  		$scope.user = arg.user;
  		$scope.$apply();
  		console.log($scope.user);
  		if ($scope.isLogin) {
  			postAuth();
  		}
  	})

  	function postAuth() {
  		if (!$scope.finishPostAuth) {
	  		$scope.finishPostAuth = true;
	  		AuthService.getProfile(function(arg) {
		  			$scope.picture = arg.picture;
		  			$scope.name = arg.name;
		  			$scope.email = arg.email;
		  			$scope.hasProfile = true;

		  			DBService.saveProfile($scope, function() {
		  				DBService.getMatch($scope.user, function(data) {
					  		if (!data) {
						  		$scope.waitForRecipient = true;
						  	} else {
						  		$scope.waitForRecipient = false;

						  		$scope.recipientName = data.name;
						  		$scope.recipientPic = data.picture;
						  		$scope.hasRecipient = true;
						  	}
		  				});
		  			});
		  		});
  		}
  	}

  });
