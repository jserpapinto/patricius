var App = angular.module('App', ['ngRoute']);
	// configure routes
	App.config(function($routeProvider, $locationProvider) {
		$routeProvider
			// route for the home page
			.when('/tournmant', {
				templateUrl : 'pages/tournmant.html',
				controller  : 'otherController'
			})

			.otherwise({redirectTo: 'pages/index.html'})

		// html5 history api
		$locationProvider.html5Mode(true);
	});


	App.controller('mainController', function($scope) {
		console.log("in main");
	});

	App.controller('otherController', function($scope) {
		console.log("in other");
	});


