myApp.controller('ExpendituresController', ['DataFactory', function(DataFactory) {
  console.log('expenditures controller running');
 var self = this;
 self.message = 'Welcome to the Expenditures View';
 self.expendituresList = DataFactory.factoryExpenditures;
 self.newEmployee = {};

self.addEmployee = function(){
  DataFactory.addEmployee(self.newEmployee);
  console.log(self.newEmployee);
}
}]);
