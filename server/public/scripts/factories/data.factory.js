myApp.factory('DataFactory', ['$http', function($http) {
  var self = this;
  self.newEmployee = {};
  self.newBudget = {};
  var factoryExpenditures = { list: [] };
  var monthlyBudget = { list: [] };
  var activeEmployees = { list: [] };
  getExpenditures();
  getActive();
  getBudget();


//WORKING WITH THE EMPLOYEE DATABASE

  function getExpenditures(){
    $http({
      method: 'GET',
      url: '/expenditures'
    }).then(function(response){
      factoryExpenditures.list = response.data;
    });
  }

  function getActive(){
    $http({
      method: 'GET',
      url: '/activeEmployees'
    }).then(function(response){
      activeEmployees.list = response.data;
    });
  }

  function addEmployee(newEmployee){
    $http({
      method: 'POST',
      url: '/newEmployee',
      data: newEmployee
    }).then(function(response){
       getExpenditures();
       getActive();
    });
  }

  function changeStatusInactive(employeeID){
    $http({
      method: 'PUT',
      url: '/inactive/' + employeeID
    }).then(function(response){
      getExpenditures();
      getActive();
    });
  }

  function changeStatusActive(employeeID){
    $http({
      method: 'PUT',
      url: '/active/' + employeeID
    }).then(function(response){
      getExpenditures();
      getActive();
    });
  }


  //WORKING WITH THE BUDGET DATABASE
  function getBudget(){
    $http({
      method: 'GET',
      url: '/budget'
    }).then(function(response){
      monthlyBudget.list = response.data;
    });
  }

  function addBudget(newBudget){
    $http({
      method: 'POST',
      url: '/newBudget',
      data: newBudget
    }).then(function(response){
      getBudget();
    });
  }

  return {
    factoryExpenditures: factoryExpenditures,
    addEmployee: addEmployee,
    activeEmployees: activeEmployees,
    changeStatusInactive: changeStatusInactive,
    changeStatusActive: changeStatusActive,
    monthlyBudget: monthlyBudget,
    addBudget: addBudget
  }

}]);
