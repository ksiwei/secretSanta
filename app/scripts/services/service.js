'use strict';

/**
 * @ngdoc service
 * @name santaApp.service
 * @description
 * # service
 * Service in the santaApp.
 */
angular.module('santaApp')
  .service('AuthService', function ($rootScope) {
  	this.checkStatus = function(login, notLogin) {
	  	FB.getLoginStatus(function(response) {
			if (checkStatus(response)) {
				login();
			} else {
				notLogin();
			}
		});
  	}

	this.login = function(success) {
		FB.login(function(response){
			console.log(response);
			if (isLogin()) {
				success(response);
			}
		  // Handle the response object, like in statusChangeCallback() in our demo
		  // code.

		  //TODO add code to stroe into db
		}, {scope: 'public_profile,email'});
	}

	function checkStatus(response) {
		console.log('statusChangeCallback');
	    console.log(response);
	    // The response object is returned with a status field that lets the
	    // app know the current login status of the person.
	    // Full docs on the response object can be found in the documentation
	    // for FB.getLoginStatus().
	    if (response.status === 'connected') {
	      // Logged into your app and Facebook.
	      return true

	    } else if (response.status === 'not_authorized') {
	      // The person is logged into Facebook, but not your app.
	      return false;
	    } else {
	    	return false;
    	}
	}



  });
