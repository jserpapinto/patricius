var App = angular.module('App', ['ngRoute', 'smart-table', 'ngFileUpload']);
// configure routes
App.config(function($routeProvider, $locationProvider) {
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})
		.when('/tournament', {
			templateUrl : 'pages/tournament.html',
			controller  : 'tournamentCtrl',
			controllerAs: 'tournament'
		})
		.when('/tournament/:id', {
			templateUrl : 'pages/tournament.html',
			controller  : 'singleTournamentCtrl'
		})
		.when('/teams', {
			templateUrl : 'pages/teams.html',
			controller : 'teamsCtrl'
		})
		.when('/players', {
			templateUrl : 'pages/players.html',
			controller : 'playersCtrl'
		})

		.otherwise({redirectTo: 'pages/home.html'})

	// html5 history api
	$locationProvider.html5Mode(true);
});


App.controller('mainController', function($scope) {
	console.log("in main");
});

App.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});