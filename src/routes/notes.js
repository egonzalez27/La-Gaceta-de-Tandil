const express = require('express');
const router = express.Router();

const Notes = require('../models/Notes');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    const { title, subtitle, description} = req.body;
    const errors = [];
    if (!title) {
        errors.push({text: 'Please Write a Title'});
    }
    if (!description) {
        errors.push({text: 'Please Write a Description'});
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            subtitle,
            description
        });
    }else{
        const newNote = new Notes({title, subtitle, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note Added successfully');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Notes.find({user: req.user.id}).lean().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Notes.findById(req.params.id).lean();
    res.render('notes/edit-notes', { note });
});

router.get('/pages/pageNews.html', isAuthenticated, async (req, res) => {
    res.render('notes/noticia');
})

router.get('/pages/sections.hbs', isAuthenticated, async (req, res) => {
    res.render('notes/sections');
})

router.put('/notes/edit-notes/:id', isAuthenticated, async (req, res) => {
    const { title, subtitle, description } = req.body;
    await Notes.findByIdAndUpdate(req.params.id, { title, subtitle, description }).lean();
    req.flash('success_msg', 'Note UpDate Successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
})

module.exports = router;