
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/studentsApiByPankaj", {
    // useCreateIndex:true,	
    useNewUrlParser: true,
	useUnifiedTopology: true,
	// findAndUpdate:false,
})
	.then(() => console.log("Connection succesfully..."))
	.catch(() => console.log("Connection Error==>"));