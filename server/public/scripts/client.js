var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
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
            redirectTo: 'expenditures'
        });
}]);
