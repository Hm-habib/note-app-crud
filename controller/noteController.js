const { ObjectId } = require("mongodb");
const NoteModel = require("../model/noteModel");




// notes app root path when run port:7000
const runViewIndex = (req, res) => {
  res.render("index"); //render view folder index file
};

// notes app mainInterface database collection
const showAllNoteDB = async (req, res) => {
  let runningUser = req.session.user;
  if (!runningUser) res.redirect("/login");
  let usersId = runningUser._id
 
  const allNotes = await NoteModel.find({ userId: usersId });
  res.render("notes/index", { items: allNotes, user: runningUser });
};

// login button to login page
const loginBtn = (req, res) => {
  res.render("user/login");
}; 

// notes app login form open under user folder
const loginPage = (req, res) => {
  res.redirect("/mainInterface");
};

// show all notes from notes/index
const showAllNotes = async (req, res) => {
  const notes = await NoteModel().find();

  res.render("notes/index", { userNotes: notes });
};

//  view note
const notesView = async (req, res) => {
  let runningUser = req.session.user;
  let note = await NoteModel.findById(req.params.id);
  res.render("notes/view", { viewItem: note, user: runningUser });
};

// delete note
const deleteNote = async (req, res) => {
  let note = await NoteModel.findById(req.params.id);
  await note.deleteOne({ _id: NoteModel.findById(req.params.id) });
  res.redirect("/mainInterface");
};

//note create button
const createNote = (req, res) => {
  res.render("notes/create");
};

// note save button
const saveNote = async (req, res) => {
  let runningUser = req.session.user;
  let note = new NoteModel();
  note.title = req.body.title;
  note.body = req.body.body;
  note.done = false;
  note.userId = runningUser._id;

  await note.save();
  res.redirect("/mainInterface");
};

//note create cancel button
const noteCancelBtn = (req, res) => {
  res.redirect("/mainInterface");
};

//notes edit button
const noteEditBtn = async (req, res) => {
  let runningUser = req.session.user;
  let note = await NoteModel.findById(req.params.id);
  res.render("notes/edit", { editNote: note, user: runningUser });
};

//notes save-edit button
const noteSaveEditBtn = async (req, res) => {

  let note = await NoteModel.findByIdAndUpdate(req.params.id);
  note.title = req.body.title;
  note.body = req.body.body;
  note.done = false;

  await note.save();
  res.redirect(`/notes/${req.params.id}/view`);
};

// note edit cancel btn
const editCancel = (req, res) => {
  res.redirect(`/notes/${req.params.id}/view`);
};

// notes mark as done
const markDone = async (req, res) => {
  let note = await NoteModel.findByIdAndUpdate(req.params.id);
  note.done = true;
  await note.save();
  res.redirect(`/notes/${req.params.id}/view`);
};

// back button
const backBtn = (req, res) => {

  res.redirect("/mainInterface");
};

module.exports = {
  runViewIndex,
  showAllNoteDB,
  loginBtn,
  loginPage,
  showAllNotes,
  notesView,
  deleteNote,
  createNote,
  saveNote,
  noteCancelBtn,
  noteEditBtn,
  editCancel,
  noteSaveEditBtn,
  markDone,
  backBtn,
};
