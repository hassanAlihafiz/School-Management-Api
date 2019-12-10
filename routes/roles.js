const express=require("express");
const app=express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');


app.use(bodyParser.json(),cors());
// config for your database
var config = {
    driver: 'msnodesqlv8',
    server: 'DESKTOP-4BCGPKP',
    database: 'SMSTECH' ,
    options: {
        trustedConnection: true
    }
};
var executeQuery = function(req, res){             
    sql.connect(config, function (err) {
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          // create Request object
          var request = new sql.Request();
          // query to the database
          request.query(req, function (err, response) {
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
               console.log(response);
               res.send(JSON.stringify(response.recordsets[0]));
              }
          });
        }
    });           
}


router.get('/',function(req,res){

    var query=" select * from Roles";
    executeQuery(query,res);
});

router.get('/:id',function(req,res){
    var query=" select * from Roles where ID="+req.params.id;
    executeQuery(query,res);
});

router.post('/AddRoles',function(req,res){

    var insertQuery="insert into Roles (Name,Type) values('"+req.body.name+"','"+req.body.type+"')";
    executeQuery(insertQuery,res);

});

router.put('/:id',function(req,res){

    var updateQuery="update Roles set Name='"+req.body.name+"',Type='"+req.body.type+"' where ID="+req.params.id;
    executeQuery(updateQuery,res);    
});



router.delete('/:id',function(req,res){

    var query="delete from Roles where ID="+req.params.id;
    executeQuery(query,res);

});


module.exports=router;