const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const users=require('./routes/user');
const student=require('./routes/student');
const section=require('./routes/section');
const role=require('./routes/roles');


app.use(bodyParser.json(),cors());


app.use('/user',users);
app.use('/student',student);
app.use('/section',section);
app.use('/role',role);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 3000);
    res.json({
        error: {
            message: error.message
        }
    })

});


module.exports = app;