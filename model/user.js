const mongoose = require('mongoose');
const schema ={
    first_name:{type:String, default:null, required :true},
    last_name:{type:String, default:null, required :true},
    email:{type:String, unique:true, required :true},
    password:{type:String,required :true},
    token:{type:String}
};

const userSchema = new mongoose.Schema(schema);
const User = mongoose.model('user',userSchema);

module.exports = User;