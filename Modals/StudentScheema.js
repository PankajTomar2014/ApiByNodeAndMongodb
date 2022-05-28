const mongoose = require('mongoose');
const validator = require('validator');

const studentScheema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
        minlength:5,
	},
	email:{
        type:String,
        required:true,
        // unique:[true,"Email is already exist."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,        
        // unique:[true,"Phone is already exist."],
        min:10,
    },
    age:{
        type:Number,
        required:true,        
        min:3,
       },
	
});

// we will create a new collection

const StudentScheema= new mongoose.model("Student",studentScheema);

module.exports = StudentScheema;