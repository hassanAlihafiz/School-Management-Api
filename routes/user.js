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

    var query="  select * from Users";
    executeQuery(query,res);

});

router.get('/:id',function(req,res){

    var query="  select * from Users where ID= "+req.params.id;
    executeQuery(query,res);
});

router.post('/AddUser',function(req,res){
  var query="insert into Users(RoleID,Name,Phone,Address,Status,Username,Password,RankID,NationalityID,EducationID,ExperienceID,ReligionID,AppointmentDate,TerminationDate,DateOfBirth,Phone2,Email,Comments) values ('"+req.body.Rid+"','"+req.body.Name+"','"+req.body.Phone+"','"+req.body.Addr+"','"+req.body.status+"','"+req.body.username+"','"+req.body.pass+"','"+req.body.Rankid+"','"+req.body.Nid+"','"+req.body.Eduid+"','"+req.body.Expid+"','"+req.body.relid+"','"+req.body.AppDate+"','"+req.body.TermDate+"','"+req.body.DOB+"','"+req.body.Phone2+"','"+req.body.email+"' ,'"+req.body.comments+"')";
    executeQuery(query,res);
});

router.put('/:id',function(req,res){

    var query= "update Users set RoleID='"+req.body.Rid+"',Name='"+req.body.Name+"',Phone='"+req.body.Phone+"',Address='"+req.body.Addr+"',Status='"+req.body.status+"',Username='"+req.body.username+"',Password='"+req.body.pass+"', RankID='"+req.body.Rankid+"',NationalityID='"+req.body.Nid+"',EducationID='"+req.body.Eduid+"',ExperienceID='"+req.body.Expid+"',ReligionID='"+req.body.relid+"',AppointmentDate='"+req.body.AppDate+"',TerminationDate='"+req.body.TermDate+"',DateOfBirth='"+req.body.DOB+"',Phone2='"+req.body.Phone2+"',Email='"+req.body.email+"',Comments= '"+req.body.comments+"' where ID=" +req.params.id;
    executeQuery(query,res);

});

router.delete('/:id',function(req,res){

    var deleteQuery="delete from Users where ID= "+req.params.id;
    executeQuery(deleteQuery,res);
});


module.exports=router;