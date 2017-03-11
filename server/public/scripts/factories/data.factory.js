myApp.factory('DataFactory', ['$http', function($http) {
  var self = this;
  self.newEmployee = {};
  var factoryExpenditures = { list: [] };
  var activeEmployees = { list: [] };
  getExpenditures();
  getActive();

  console.log('in factory', factoryExpenditures);

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
      getActive();
      getExpenditures();
    })
  }

  function changeStatusActive(employeeID){
    $http({
      method: 'PUT',
      url: '/active/' + employeeID
    }).then(function(response){
      getActive();
      getExpenditures();
    })
  }

  return {
    factoryExpenditures: factoryExpenditures,
    addEmployee: addEmployee,
    activeEmployees: activeEmployees,
    changeStatusInactive: changeStatusInactive,
    changeStatusActive: changeStatusActive
  }

}]);
