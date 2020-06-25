var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    rollnumber: {
        type: String,
        required:true,
        unique:true
    },
    branch: {
        type: String,
        required:true
    },
    yearofpassing: {
        type: Number,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    mobile: {
        type: Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;