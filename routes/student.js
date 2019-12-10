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

    var query="select * from Students";
    executeQuery(query,res);
});

router.get('/:id',function(req,res){

    var query="select * from Students where ID="+req.params.id;
    executeQuery(query,res);
});


router.post('/AddStudent',function(req,res){

    var query=" insert into Students(SectionID,UserID,RollNo,Name,sDate,Status,image,BirthDate,StuCNIC,FamilyID,Gender,JoiningClassID,LeavingDate,registration_no,NationalityID,ReligionID,Email,StuGroupID)values('"+req.body.secid+"','"+req.body.uid+"','"+req.body.rollNo+"','"+req.body.name+"','"+req.body.sDate+"','"+req.body.status+"','"+req.body.image+"','"+req.body.DOB+"','"+req.body.sNIC+"','"+req.body.famid+"','"+req.body.gender+"','"+req.body.joiningCid+"','"+req.body.leaveDate+"','"+req.body.regNo+"','"+req.body.NatId+"','"+req.body.relId+"','"+req.body.email+"','"+req.body.StuGrpId+"')";
    executeQuery(query,res);
});

router.put('/:id',function(req,res){
var query= "update Students set SectionID='"+req.body.secid+"',UserID='"+req.body.uid+"',RollNo='"+req.body.rollNo+"',Name='"+req.body.name+"',sDate='"+req.body.sDate+"',Status='"+req.body.status+"',image='"+req.body.image+"',BirthDate='"+req.body.DOB+"',StuCNIC= '"+req.body.sNIC+"',FamilyID='"+req.body.famid+"',Gender='"+req.body.gender+"',JoiningClassID='"+req.body.joiningCid+"',LeavingDate='"+req.body.leaveDate+"',registration_no='"+req.body.regNo+"',NationalityID='"+req.body.NatId+"',ReligionID='"+req.body.relId+"',Email= '"+req.body.email+"',StuGroupID='"+req.body.StuGrpId+"' where ID=" +req.params.id;
executeQuery(query,res);

});

router.delete('/:id',function(req,res){

    var query="delete from Students where ID="+req.params.id;
    executeQuery(query,res);

});

module.exports=router;