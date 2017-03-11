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

router.get('/expenditures', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      console.log('There was an error connecting to the database');
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM employee_information  ORDER BY active desc;', function(err, result){
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
          res.status(200);
        }
      });
    }
  });
});

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
          res.status(200);
        }
      });
    }
  });
});

module.exports = router;
