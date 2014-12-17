'use strict';

/**
 * @ngdoc service
 * @name santaApp.service
 * @description
 * # service
 * Service in the santaApp.
 */
angular.module('santaApp')
  .service('AuthService', function ($rootScope, $http) {
  	this.checkStatus = function(login, notLogin) {
	  	FB.getLoginStatus(function(response) {
			setStatus(response);
		});
  	}

	this.login = function(success) {
		FB.login(function(response){
			setStatus(response);
		}, {scope: 'public_profile,email'});
	}

	this.getProfile = function(setProfileCallback) {
		FB.api('/me', function(response) {
			FB.api('/me/picture?height=200&type=normal&width=200', function(picture) {
				console.log('Successful login for: ' + response.name + " and pic is ", picture.data.url);
      			console.log(response);
      			var arg = {
      				"name" : response.name,
      				"email" : response.email,
      				"picture" : picture.data.url

      			}
      			setProfileCallback(arg);
			})
    	});
	}

	function setStatus(response) {
		console.log('statusChangeCallback');
	    console.log(response);

	    var arg = { "status" : "unauthorized"};
	    if (response.status === 'connected') {
	      var userID = response.authResponse.userID;
	      $rootScope.user = userID;
	      arg = { "user" : userID, "status" : "connected"}
	    } 

    	$rootScope.$broadcast("Auth", arg);
	}

  })
  .service('DBService', function ($rootScope, $http) {
	 this.saveProfile = function(arg, callback) {
		var argString = 
			"name=" + arg.name +
			"&email=" + arg.email +
			"&fbId=" + arg.user +
			"&picture=" + arg.picture;

		console.log(arg);

		$http.get('https://secret-santa-022.herokuapp.com/addPlayer/?' + argString).
		  success(function(data, status, headers, config) {
		  	console.log("save to db success: ", data);
		  	callback();
		  }).
		  error(function(data, status, headers, config) {
		  	console.log("save to db error: ", data);
		  });
	 };  	

	 this.getMatch = function(user, callback) {
	 	$http.get('https://secret-santa-022.herokuapp.com/getRecipient?fbId=' + user).
		  success(function(data, status, headers, config) {
		  	console.log("get recipient success: ", data);
		  	callback();
		  }).
		  error(function(data, status, headers, config) {
		  	console.log("get recipient error: ", data);
		  });
	 };
  });
