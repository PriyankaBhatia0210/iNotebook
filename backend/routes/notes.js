const express = require('express')
const router = express.Router()
const notesSchema = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async(req, res)=> {
    let success = false;
    try {

        //Get all notes for this user from database
        const allNotes = await notesSchema.find({user: req.user.id})

        //Return all those notes
        res.json(allNotes)
        success = true;
    } catch (error) {
        success = false
        return res.status(500).send("Internal server occured here!")
    }
})

router.post('/addnotes', [
    body('title').isLength({ min: 3 }).withMessage({
        message: 'Minimum length for title should be 5'
    }),
    body('description').isLength({ min: 5 }).withMessage({
        message: 'Minimum length for description should be 5'
    }),
], fetchuser, async(req, res)=> {
    //checking all errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
    }

    let success = false;

    try {
        //Add notes for this user id
        const savedNotes = await notesSchema.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })

        //save notes in database
        await savedNotes.save()

        //Return these notes in response
        res.json(savedNotes)
        success = true;
    } catch (error) {
        success = false
        return res.status(500).send("Internal server occured here!")
    }
})

router.put('/updatenotes/:id', fetchuser, async(req, res)=> {
    const {title, description, tag} = req.body

    //Create a newNote
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find note to be updated
    let note = await notesSchema.findById(req.params.id)

    //If note does not exist
    if(!note){return res.status(404).send("Note not found!")}

    //If user is not authorized
    if(note.user.toString()!= req.user.id){
        return res.status(401).send("Unauthorized!")
    }

    //Update note
    note = await notesSchema.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json(note)

})

router.delete('/deletenotes/:id', fetchuser, async(req, res)=> {
    const note = await notesSchema.findById(req.params.id)
    //If note does not exist
    if(!note){return res.status(404).send("Note not found!")}

    //Check if user is authorized
    if(note.user.toString()!= req.user.id){
        return res.status(401).send("Unauthorized!")
    }



    //If authorized, delete note from database
    const deleteNote = await notesSchema.findByIdAndDelete(req.params.id, note)
    res.json(deleteNote)
})
module.exports = router