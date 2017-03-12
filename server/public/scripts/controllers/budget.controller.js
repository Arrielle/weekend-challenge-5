myApp.controller('BudgetController', ['DataFactory', function(DataFactory) {
  console.log('budget controller running');

  var self = this;
  self.message = "Welcome to the Budget View";
  self.newBudget = {};

  self.budget = DataFactory.monthlyBudget;

  self.addBudget = function(){
    DataFactory.addBudget(self.newBudget);
    console.log('button was clicked')
  }

}]);
