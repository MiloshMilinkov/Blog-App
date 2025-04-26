import mongoose from "mongoose";
//password hashing
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash:{
        type: String,
        required: true
    }
},
{
timestamps: true
})

userSchema.pre('save', async function (next){

    if(!this.isModified('passwordHash')){
        return next();
    }

    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);

    next();
});

userSchema.methods.verifyPassword = function (password){
    return bcrypt.compare(password, this.passwordHash);
}

export default mongoose.models.User || mongoose.model('User', userSchema);