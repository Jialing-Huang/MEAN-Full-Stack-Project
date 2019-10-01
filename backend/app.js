const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Student = require('./models/student');

mongoose
  .connect(
    "mongodb+srv://merlin:merlin123@merlin-v2smb.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-with, Content-Type, Accept"
        );
    res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,POST,PATCH,DELETE,OPTIONS"
        );
    next();
});

//CRUD
//Read all
app.get('/students',(req,res,next)=>{
    Student
        .find()
        .exec()
        .then(docs=>{
            console.log(docs);
            console.log("get all students!");
            res.status(200).json({
                message:'Get stutent list db',
                students:docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
});

app.get('/count',(req,res,next)=>{
    Student
        .estimatedDocumentCount()
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message:'Get amount of documents in DB',
                amount:result
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
});

//Create
app.post('/create',(req,res,next)=>{
    const student = new Student(
        {
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Gender:req.body.Gender
        }
    );
    student
        .save()
        .then(result=>{
            console.log(result);
            // const amountOfDocument = result.estimatedDocumentCount();
            res.status(200).json(
                {
                    message:'Handling POST requests to /students/create',
                    storeId: result.mongoid,
                    // amount:result.estimatedDocumentCount()
                }               
            );
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });  
});

//Read item byid
app.get('/students/:mongoid',(req,res,next)=>{
     const id = req.params.mongoid;
     Student
         .findById(id)
         .exec()
         .then(docs=>{
             console.log(docs);
             res.status(200).json({
                 message:"OK",
                 docs:docs
             });
         })
         .catch(err => {
             res.status(500).json({
                 error:err
                });
        });
    });

//Another way of update, however, not verify it. Keep it as a reference
// app.patch('/students/:mongoid',(req,res,next)=>{
//     const storeid = req.params.mongoid;
//     const updateOps = {};
//     for(const item of req.body){
//         updateOps[item.propName] = item.value; 
//     };
//     Student
//         .update(
//             {mongoid:storeid},
//             {$set: updateOps}
//             )
//         .exec()
//         .then((result) => {
//             console.log(result);
//             res.status(200).json(
//                 {
//                     message:'Update success!',
//                     result:result
//                 }
//             );
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         });
// });

app.patch('/update/:mongoid',(req,res,next)=>{
    const storeid = req.params.mongoid;   
    Student
        .findByIdAndUpdate(
            storeid,
            req.body,
            {new: true}
        )      
        .then((result) => {
            console.log(result);
            res.status(200).json(
                {
                    message:'Update success!',
                    result:result
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});


app.delete('/delete/:mongoid',(req,res,next)=>{
    const storeid = req.params.mongoid;   
    Student
        .findByIdAndRemove(storeid)      
        .then((result) => {
            console.log(result);
            res.status(200).json({message:'Delete success!'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

// app.delete('/delete/:mongoid',(req,res,next)=>{
//     const storeid = req.params.mongoid;
//     Student
//         .remove({mongoid:storeid})
//         .exec()
//         .then((result) => {
//             res.status(200).json(
//                 {
//                     message:'Delete success!'
//                 }
//             );
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         });
// });

module.exports = app;