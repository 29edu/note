import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: [true, 'Please add the name'],
        trim: true,
    },

    email: {
        type: String,
        required: [ true, 'Please add an email'],
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String, 
        required: [true, 'Please add a password'],
        trim: true,
        minlength: [ 6, 'Password must be at least 6 characters']
    },

}, {
    timestamps: true, // Automatically adds createAt and updateAt
})

// .pre() is a Mongoose middleware hook — a special function that runs before (that’s what “pre” means) a specific action happens.
// It lets you execute custom logic before saving, validating, updating, or removing a document.
userSchema.pre('save', async function (next) {

    // only Hash if the password is modified
    try {
        if(!this.isModified('password')) {
            return next();
        }

        // Generating salt and hash password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password,salt);

        next();
    } catch (error) {
        console.log("Error found in UserModels", error);
    }
})

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;