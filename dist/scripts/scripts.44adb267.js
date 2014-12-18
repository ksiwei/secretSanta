"use strict";window.fbAsyncInit=function(){FB.init({appId:"1583515518538640",xfbml:!0,version:"v2.2"}),angular.module("santaApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}])},angular.module("santaApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("santaApp").controller("LoginCtrl",["$scope","AuthService","DBService","$rootScope","$http",function(a,b,c){function d(){a.finishPostAuth||(a.finishPostAuth=!0,b.getProfile(function(b){a.picture=b.picture,a.name=b.name,a.email=b.email,a.hasProfile=!0,c.saveProfile(a,function(){c.getMatch(a.user,function(b){if(b){a.waitForRecipient=!1,a.recipientName=b.name,a.recipientPic=b.picture,a.hasRecipient=!0;var c=b.fbId;c&&FB.api("/"+c+"/picture?height=200&type=normal&width=200",function(b){console.log("Successful find recipient pic is ",b.data.url),console.log(b),a.recipientPic=b.data.url,a.$apply()})}else a.waitForRecipient=!0})})}))}a.hasStatus=!1,a.isLogin=!1,b.checkStatus(),a.login=b.login,a.$on("Auth",function(b,c){a.isLogin="connected"===c.status,a.hasStatus=!0,a.user=c.user,a.$apply(),console.log(a.user),a.isLogin&&d()})}]),angular.module("santaApp").service("AuthService",["$rootScope","$http",function(a){function b(b){console.log("statusChangeCallback"),console.log(b);var c={status:"unauthorized"};if("connected"===b.status){var d=b.authResponse.userID;a.user=d,c={user:d,status:"connected"}}a.$broadcast("Auth",c)}this.checkStatus=function(){FB.getLoginStatus(function(a){b(a)})},this.login=function(){FB.login(function(a){b(a)},{scope:"public_profile,email"})},this.getProfile=function(a){FB.api("/me",function(b){FB.api("/me/picture?height=200&type=normal&width=200",function(c){console.log("Successful login for: "+b.name+" and pic is ",c.data.url),console.log(b);var d={name:b.name,email:b.email,picture:c.data.url};a(d)})})}}]).service("DBService",["$rootScope","$http",function(a,b){this.saveProfile=function(a,c){var d="name="+a.name+"&email="+a.email+"&fbId="+a.user+"&picture="+a.picture;console.log(a),b.get("https://secret-santa-022.herokuapp.com/addPlayer/?"+d).success(function(a){console.log("save to db success: ",a),c()}).error(function(a){console.log("save to db error: ",a)})},this.getMatch=function(a,c){b.get("https://secret-santa-022.herokuapp.com/getRecipient?fbId="+a).success(function(a){console.log("get recipient success: ",a),c(a)}).error(function(a){console.log("get recipient error: ",a)})}}]);