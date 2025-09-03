const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");

// notes router root path when run port:7000
router.get("/", noteController.runViewIndex);

// notes router mainInterface database collection
router.get("/mainInterface", noteController.showAllNoteDB);

// login btn
router.get("/login", noteController.loginBtn);

// show all notes from notes/index
router.get("/mainInterface", noteController.showAllNotes);

// notes view
router.get("/notes/:id/view", noteController.notesView);

// delete note
router.post("/notes/:id/delete", noteController.deleteNote);

//note create button
router.get("/notes/create", noteController.createNote);

// note save button
router.post("/notes/save", noteController.saveNote);

//note cancel button
router.get("/notes/create/cancel", noteController.noteCancelBtn);

//notes edit button
router.get("/notes/:id/edit", noteController.noteEditBtn);

// note edit cancel btn
router.get("/notes/:id/edit/cancel", noteController.editCancel);

//notes save-edit button
router.post("/notes/:id/save-edit", noteController.noteSaveEditBtn);

// notes mark as done
router.post("/notes/:id/markDone", noteController.markDone);

// back button
router.get("/notes/:id/back", noteController.backBtn);

module.exports = router;
