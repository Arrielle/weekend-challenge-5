myApp.controller('ExpendituresController', ['DataFactory', function(DataFactory) {
  console.log('expenditures controller running');
 var self = this;
 self.message = 'Welcome to the Expenditures View';
 self.expendituresList = DataFactory.factoryExpenditures;
 self.activeEmployeeList = DataFactory.activeEmployees;
 self.montlyExpenditure = 0;
 self.newEmployee = {};

self.calculateBudget = function(){
  // self.budget = DataFactory.monthlyBudget.list;
}

//Adds a new employee to the database and immediately shows on the DOM
self.addEmployee = function(){
  DataFactory.addEmployee(self.newEmployee);
}

//BUTTON FUNCTIONALITY / ACTIVITY STATUS
//Active -> Inactive
self.statusChangeInactive = function(employeeID){
  DataFactory.changeStatusInactive(employeeID);
}
//Inactive -> Active
self.statusChangeActive = function(employeeID){
  DataFactory.changeStatusActive(employeeID);
}

//Calculates monthly expenditure of all active employees
self.calculateExpenditure = function(){
  var totalSalary = 0;
  for (var i = 0; i < self.activeEmployeeList.list.length; i++) {
    totalSalary += self.activeEmployeeList.list[i].annual_salary;
  }
  self.monthlyExpenditure = totalSalary/12;
  return self.monthlyExpenditure
}


//BUDGET STUFF
self.newBudget = {};
self.budget = DataFactory.monthlyBudget;

self.broke = function(){
  if (ec.budget.list[0].monthly_budget < self.calculateExpenditure()){
    console.log('yall out of money');
  } else {
    console.log('yall good');
  }

}

}]);
