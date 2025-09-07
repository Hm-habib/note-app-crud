const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");
const {isAuthenticated} = require('../middleware/authMiddleware')

// notes router root path when run port:7000
router.get("/", noteController.runViewIndex);

// notes router mainInterface database collection
router.get("/mainInterface",isAuthenticated, noteController.showAllNoteDB);

// login btn
router.get("/login", noteController.loginBtn);

// show all notes from notes/index
router.get("/mainInterface",isAuthenticated, noteController.showAllNotes);

// notes view
router.get("/notes/:id/view",isAuthenticated, noteController.notesView);

// delete note
router.post("/notes/:id/delete",isAuthenticated, noteController.deleteNote);

//note create button
router.get("/notes/create",isAuthenticated, noteController.createNote);

// note save button
router.post("/notes/save",isAuthenticated, noteController.saveNote);

//note cancel button
router.get("/notes/create/cancel",isAuthenticated, noteController.noteCancelBtn);

//notes edit button
router.get("/notes/:id/edit",isAuthenticated, noteController.noteEditBtn);

// note edit cancel btn
router.get("/notes/:id/edit/cancel",isAuthenticated, noteController.editCancel);

//notes save-edit button
router.post("/notes/:id/save-edit",isAuthenticated, noteController.noteSaveEditBtn);

// notes mark as done
router.post("/notes/:id/markDone",isAuthenticated, noteController.markDone);

// back button
router.get("/notes/:id/back",isAuthenticated, noteController.backBtn);

module.exports = router;
