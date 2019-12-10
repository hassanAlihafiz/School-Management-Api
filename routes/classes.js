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

    var query ="select c.ID,c.Name,c.ClassNumber,cl.Name as Class_LevelName,cl.LevelNumber from classes c inner join ClassLevels cl on c.Level_id=cl.ID";
    executeQuery(query,res);

});

router.get('/:id',function(req,res){
    var query ="select c.ID,c.Name,c.ClassNumber,cl.Name as Class_LevelName,cl.LevelNumber from classes c inner join ClassLevels cl on c.Level_id=cl.ID where c.ID="+req.params.id;
    executeQuery(query,res);

});

router.post('/AddClasses',function(req,res){

    var query="insert into classes (Name,ClassNumber,Level_id) values('"+req.body.name+"','"+req.body.classNumber+"','"+req.body.levelId+"')";
    executeQuery(query,res);
});
router.put('/:id',function(req,res){

    var query="update classes set Name='"+req.body.name+"',ClassNumber='"+req.body.classNumber+"',Level_id='"+req.body.levelId+"' where ID="+req.params.id;
    executeQuery(query,res);
});

router.delete('/:id',function(req,res){
    var query="delete from Classes where ID="+req.params.id;
    executeQuery(query,res);
});


module.exports=router;