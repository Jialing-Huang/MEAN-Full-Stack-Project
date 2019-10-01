const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {       
        mongoid:mongoose.Schema.Types.ObjectId,
        FirstName:String,
        LastName:String,
        Gender:String
    }
); 

module.exports = mongoose.model('StudentBackend', studentSchema);