import Note from '../models/Note.js'
import { createError } from "../middlewares/error.js";

export const addNote = async(req,res,next) => {
    const newNote = new Note({userId: req.user.id, ...req.body});
    try {
        const savedNote = await newNote.save();
        res.status(200).json(savedNote._id);
    } 
    catch(err){
        next(err);
    }
}

export const updateNote = async(req,res,next) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return next(404,"Notes not found");
        if(req.user.id===note.userId){
            const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
                $set:req.body
            },{new:true})
            res.status(200).json(updatedNote);
        }
        else {
            next(createError(403,"You can update only your notes."))
        }
    } 
    catch(err){
        next(err);
    }
}

export const deleteNote = async(req,res,next) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return next(404,"Notes not found");
        if(req.user.id===note.userId){
            await Note.findByIdAndDelete(req.params.id)
            res.status(200).json({"message":"Note Deleted Succesfully"});
        }
        else {
            next(createError(403,"You can delete only your notes."))
        }
    } 
    catch(err){
        next(err);
    }
}

export const getNote = async(req,res,next) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return next(404,"Notes not found");
        if(req.user.id===note.userId){
            res.status(200).json(note);
        }
        else {
            next(createError(403,"You can view only your notes."))
        }
    } 
    catch(err){
        next(err);
    }
}


export const getNoteBySearch = async(req,res,next) => {
    let tags = ""
    let search = ""
    if(req.query.tags) tags = req.query.tags.split(',') 
    if(req.query.q) search = req.query.q
    try {
        const notesByTags = await Note.find({userId:req.user.id,tags:{$in:tags}});
        const notesBySearch = await Note.find({userId:req.user.id,title:{$regex: search, $options:"i"}});
        const note = {...notesBySearch,...notesByTags}
        if(!note) return next(404,"Notes not found");
        if(req.user.id===note[0].userId){
            res.status(200).json(note);
        }
        else {
            next(createError(403,"You can view only your notes."))
        }
    } 
    catch(err){
        next(err);
    }
}

// Function to get all notes
export const getAllNotes = async(req,res,next) => {
    try {
        const notes = await Note.find({userId:req.user.id});
        if(!notes) return next(404,"Notes not found");
        res.status(200).json(notes);
    } 
    catch(err){
        next(err);
    }
}