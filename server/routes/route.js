var router = require('express').Router();
var pg = require('pg')

var config = {
  database: 'phi',
  host: 'localhost',
  port: '5432',
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

// GETS ALL EMPLOYEE INFO FROM THE DATABASE
router.get('/expenditures', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      console.log('There was an error connecting to the database');
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM employee_information', function(err, result){
        done();
        if(err){
          console.log('Error making the database query');
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);
        }//ends else
      });//end of query function
    }//ends else
  });//ends pool.connect
}); //ends expenditures router

// GETS ALL BUDGET INFO FROM THE DATABASE
router.get('/budget', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      console.log('There was an error connecting to the database');
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM employee_budget ORDER BY id desc', function(err, result){
        done();
        if(err){
          console.log('Error making the database query');
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);
        }//ends else
      });//end of query function
    }//ends else
  });//ends pool.connect
}); //ends expenditures router


//GETS ALL ACTIVE EMPLOYEES FROM THE DATABASE
router.get('/activeEmployees', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      console.log('There was an error connecting to the database');
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM employee_information WHERE active;', function(err, result){
        done();
        if(err){
          console.log('Error making the database query');
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);
        }//ends else
      });//end of query function
    }//ends else
  });//ends pool.connect
}); //ends expenditures router

//ADDS A NEW EMPLOYEE TO THE DATABASE AND POSTS THEM ON THE DOM
router.post('/newEmployee', function(req,res){
  console.log('hit post route');
  var employeeObject = req.body;
  pool.connect(function(err, client, done){
    if(err){
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO employee_information (first_name, last_name, id_number, job_title, annual_salary) VALUES ($1, $2, $3, $4, $5);',
    [employeeObject.first_name, employeeObject.last_name, employeeObject.id_number, employeeObject.job_title, employeeObject.annual_salary], function(err, result){
      done();
      if (err){
        res.sendStatus(500);
      } else {
        res.status(200).send(result.rows);
      }//ends else
    });//ends client query
  }//ends else
  });//end pool.connect
});//ends newEmployee post

//ADDS A NEW EMPLOYEE TO THE DATABASE AND POSTS THEM ON THE DOM
router.post('/newBudget', function(req,res){
  console.log('hit post route');
  var budgetObject = req.body;
  console.log(budgetObject)
  pool.connect(function(err, client, done){
    if(err){
      console.log('error connecting to database')
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO employee_budget (monthly_budget, month)VALUES ($1, $2);',
    [budgetObject.monthly_budget, budgetObject.month], function(err, result){
      done();
      if (err){
        res.sendStatus(500);
      } else {
        console.log('error posting to database')
        res.status(200).send(result.rows);
      }//ends else
    });//ends client query
  }//ends else
  });//end pool.connect
});//ends newEmployee post

//CHANGES AN EMPLOYEES STATUS FROM ACTIVE TO INACTIVE (TRUE TO FALSE)
router.put('/inactive/:id', function(req, res){
  var employeeStatusToChangeID = req.params.id;
  console.log(req.params.id);
  pool.connect(function(err, client, done){
    if(err){
      console.log('error connecting to database')
      res.sendStatus(500);
    } else {
      client.query('UPDATE employee_information SET active = FALSE WHERE ID = $1;',
      [employeeStatusToChangeID], function(err, result){
        done();
        if (err){
          console.log('error updating the database');
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);;
        }
      });
    }
  });
});

//CHANGES AN EMPLOYEES STATUS FROM INACTIVE TO ACTIVE (FALSE TO TRUE)
router.put('/active/:id', function(req, res){
  var employeeStatusToChangeID = req.params.id;
  console.log(req.params.id);
  pool.connect(function(err, client, done){
    if(err){
      console.log('error connecting to database')
      res.sendStatus(500);
    } else {
      client.query('UPDATE employee_information SET active = true WHERE ID = $1;',
      [employeeStatusToChangeID], function(err, result){
        done();
        if (err){
          console.log('error updating the database');
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);;
        }
      });
    }
  });
});

module.exports = router;
