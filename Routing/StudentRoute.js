const express = require('express');
const StudentScheema = require('../Modals/StudentScheema');

const StudentRouter = express.Router();

StudentRouter.post('/createStudent',async(request,response)=>{
    try{
        const newStudent = StudentScheema(request.body);
        console.log("Postman Data==>",newStudent);
        const createdStudent = await newStudent.save();
        response.status(201).send(createdStudent);       
    }catch(error){
        response.status(400).send(error);   
    }
});

StudentRouter.get('/getAllStudents',async(request,response)=>{
    try{       
        const createdStudent = await StudentScheema.find();
        response.status(201).send(createdStudent);       
    }catch(error){
        response.status(400).send(error);   
    }
});
StudentRouter.delete('/deleteStudent/:id',async(request,response)=>{
    try{
        const id  = request.params.id;
        console.log("Postman Data==>",id);
        const deletedStudent = await StudentScheema.findByIdAndDelete(id);       
        if(!id){
          return  response.status(400).send();  
        }else{
            response.send(deletedStudent);  
        }             
    }catch(error){
        response.status(500).send(error);   
    }
});

StudentRouter.put('/updateStudent/:id',async(request,response)=>{
    try{
        const id  = request.params.id;
        console.log("Postman Data==>",id,request.body);
        const updateStudent = await StudentScheema.findByIdAndUpdate(id,request.body,{
            new: true
        });       
        if(!id){
          return  response.status(404).send();  
        }else{
            response.send(updateStudent);  
        }             
    }catch(error){
        response.status(500).send(error);   
    }
});

module.exports = StudentRouter;
