import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
const UserSchema = new Schema({
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    }

},
    {
        versionKey:false
    });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('user',UserSchema);
export default UserModel;