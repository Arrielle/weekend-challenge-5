myApp.controller('ExpendituresController', ['DataFactory', function(DataFactory) {
  console.log('expenditures controller running');
 var self = this;
 self.message = 'Welcome to the Expenditures View';
 self.expendituresList = DataFactory.factoryExpenditures;
 self.activeEmployeeList = DataFactory.activeEmployees;
 self.montlyExpenditure = 0;
 self.newEmployee = {};

self.addEmployee = function(){
  DataFactory.addEmployee(self.newEmployee);
  console.log(self.newEmployee);
}

self.calculateExpenditure = function(){
  var totalSalary = 0;
  for (var i = 0; i < self.activeEmployeeList.list.length; i++) {
    totalSalary += self.activeEmployeeList.list[i].annual_salary;
  }
  self.monthlyExpenditure = totalSalary/12;
  return self.monthlyExpenditure
}

self.statusChangeInactive = function(employeeID){
  DataFactory.changeStatusInactive(employeeID);
}

self.statusChangeActive = function(employeeID){
  DataFactory.changeStatusActive(employeeID);
}

}]);
