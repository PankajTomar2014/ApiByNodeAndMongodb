const express = require('express');
const StudentScheema = require('../Modals/StudentScheema');

const StudentRouter = express.Router();

StudentRouter.post('/createStudent',async(request,response)=>{
    try{
        const newStudent = StudentScheema(request.body);
        console.log("Postman Data==>",newStudent);
        const createdStudent = await newStudent.save();

        const createdSuccess = {
            message:"Student created successfully",
            data:createdStudent,
            status:true
        };

        response.status(201).send(createdSuccess);       
    }catch(error){
        // console.log("error==>",error);
        const createdFailed = {
            message:"Email or phone is already exist",
            data:[],
            status:false
        };
        response.status(400).send(createdFailed);   
    }
});

StudentRouter.get('/getAllStudents',async(request,response)=>{
    try{       
        const getAllStudents = await StudentScheema.find();
        if(getAllStudents !=null ){
            const getAllStudentsSuccess = {
                message:"Student listed success", 
                status:true, 
                data:[getAllStudents]
                
            };
    
            response.status(201).send(getAllStudentsSuccess);  
        }else{
            const getAllStudentsFailed = {
                message:"Student listed falied",  
                data:null,             
                status:false
            };
    
    
            response.status(400).send(getAllStudentsFailed); 
        }

             
    }catch(error){
        const getAllStudentsFailed = {
            message:error.message,  
            data:null,             
            status:false
        };


        response.status(400).send(getAllStudentsFailed);   
    }
});
StudentRouter.delete('/deleteStudent/:id',async(request,response)=>{
    try{
        const id  = request.params.id;
        console.log("Postman Data==>",id);
        const deletedStudent = await StudentScheema.findByIdAndDelete(id);        
        if(!id || deletedStudent === null ){
            const deletedFailed = {
                message:"Student is not exist",  
                data:null,             
                status:false
            };
          return  response.status(400).send(deletedFailed);  
        }else{
            const deletedSuccess = {
                message:"Student deleted successfully.", 
                data:deletedStudent,
                status:true
            };
            response.send(deletedSuccess);  
        }             
    }catch(error){
        const deletedFailed = {
            message:error.message,  
            data:null,             
            status:false
        };
        response.status(500).send(deletedFailed);   
    }
});

StudentRouter.put('/updateStudent/:id',async(request,response)=>{
    try{
        const id  = request.params.id;
        console.log("Postman Data==>",id,request.body);
        const updateStudent = await StudentScheema.findByIdAndUpdate(id,request.body,{
            new: true
        });       
        if(!id || updateStudent === null ){
            const updateFailed = {
                message:"Student not exit.", 
                data:null,
                status:false
            }

          return  response.status(404).send(updateFailed);  
        }else{
            const updateSuccess = {
                message:"Student updated successfully.", 
                data:updateStudent,
                status:true
            }

            response.send(updateSuccess);  
        }             
    }catch(error){
        const updateFailed = {
            message:error.message, 
            data:null,
            status:false
        }
        response.status(500).send(updateFailed);   
    }
});

module.exports = StudentRouter;
