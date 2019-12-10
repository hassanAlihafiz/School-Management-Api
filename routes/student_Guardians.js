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

    var query="select * from Student_Guardians";
    executeQuery(query,res);
});
router.get('/:id',function(req,res){

    var query="select * from Student_Guardians where ID="+req.params.id;
    executeQuery(query,res);
});
router.post('/AddStudentGuardians',function(req,res){

    var query="  insert into Student_Guardians (Name,Phone,Phone2,Address,Status,NIC,Voice) values ('"+req.body.Name+"','"+req.body.phone+"','"+req.body.phone2+"','"+req.body.Addr+"','"+req.body.status+"','"+req.body.nic+"','"+req.body.voice+"')";
    executeQuery(query,res);

});
router.put('/:id',function(req,res){
    var query="update Student_Guardians set Name='"+req.body.Name+"',Phone='"+req.body.phone+"',Phone2='"+req.body.phone2+"',Address='"+req.body.Addr+"',Status='"+req.body.status+"',NIC='"+req.body.nic+"',Voice='"+req.body.voice+"' where ID="+req.params.id;
    executeQuery(query,res);
});

router.delete('/:id',function(req,res){

    var query="delete from  Student_Guardians where ID="+req.params.id;
    executeQuery(query,res);
});



module.exports=router;