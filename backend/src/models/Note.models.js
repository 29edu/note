import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required:[true, 'Please add title of the Note'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 100 characters']
    },

    content: {
        type: String,
        required: [true, 'Please write something...'],
        trim: true,
    }, 

    createdAt: {
        type: Date,
        default: Date,
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema);
export default Note;