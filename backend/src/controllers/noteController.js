import { raw } from "express";
import Note from "../models/Note.models.js";
import { isValidObjectId } from "mongoose";

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user?.id; // if the req.user exist then return id otherwise return undefined, don't throw an error

        if(!userId) {
            return res.status(401).json({
                success: false,
                messgae: 'Unauthorized access'
            })
        }

        if(!title) {
            return res.status(400).json({
                success: false,
                message: "Please Enter the title"
            })
        }

        if(!content) {
            return res.status(400).json({
                success: false,
                message: "Please Enter the Some content...",
            })
        }

        const newNote = await Note.create({
            title,
            content,
            user: userId
        })

        res.status(201).json({
            success: true,
            message: 'New Note created successfully',
            data: newNote
        })

    } catch(error) {
        console.error("CreateNote Error ", error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }

}

const getNotes = async (req, res) => {
    try {
        
        const userId = req.user?.id;

        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access to Notes"
            })
        }

        const notes = await Note.find({user: userId}).sort({
            createdAt: -1,
        })

        if(!notes || notes.length===0) {
            return res.status(400).json({
                success: false,
                message: "No notes found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Notes retrieved successfully",
            count: notes.length,
            data: notes
        })
    } catch (error) {
        console.error("getNotes Error", error);
        res.status(500).json({
            success: false,
            message: `Server error in the note controller, ${error.message}`
        })
    }
}

const getNoteById = async (req, res) => {
    try {

        const noteId = req.params.id;
        const userId = req.user.id;
        const note = await Note.findById(noteId);

        // checking if the userId is valid or not because mongoDB behaves unexpectedly or throw an error
        if(!isValidObjectId(noteId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note id"
            })
        }

        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access to the note using Id"
            })
        }

        // Check if the id belongs to the logged in user or not 
        if(note.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                messages: 'Not Authorized to access this note',
            })
        }

        if(!note) {
            return res.status(400),json({
                success: false,
                message: "No Notes found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Notes retrieved successfully",
            count: note.length,
            data: note
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Server Error: ${error.message}`,
        })
    }
}

// Updating Note
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        const {title, content, createdAt} = await Note.find({ user: req.user.id});

        if(!title) {
            return res.status(400).json({
                success: false,
                message: 'Please Enter the title'
            })
        }

        if(!content) {
            return res.status(400).json({
                success: false,
                messgae: 'Please Enter the content'
            })
        }

        // checking Authorization
        if(note.user.toString() !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this Note'
            })
        }

        const newNote = await Note.findById(req.params.id,
            {
                title,
                content,
                createAt: Date
            }, 
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            messgae: "Updated Successfully",
            data: newNote
        })
    } catch (error) {
        if(error.kind==='ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            })
        }
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = Note.findById(req.params.id);

        if(!note) {
            return res.status(400).json({
                success: false,
                message:"Note don't exist"
            })
        }

        // Checking authorization
        if(note.user.toString() !== req.params.id) {
            return res.status(403).json({
                success: false,
                message:  'Not Authorized to delete this Note'
            })
        }

        await note.deleteOne();

        note.status(200).json({
            success: true,
            message: 'Deleted Sucessfully',
            data: {}
        });

    } catch (error) {
        console.error("DeleteNote error: ", error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
    }
}

export { createNote, getNotes, getNoteById, updateNote, deleteNote};