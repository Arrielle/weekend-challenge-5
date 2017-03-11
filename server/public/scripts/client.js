var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .when('/expenditures', {
          templateUrl: '/views/templates/expenditures.html',
          controller: 'ExpendituresController',
          controllerAs: 'ec'
        })
        .when('/budget', {
            templateUrl: '/views/templates/budget.html',
            controller: 'BudgetController',
            controllerAs: 'bc'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);
