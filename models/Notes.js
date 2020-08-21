const mongoose = require("mongoose");

// Mongoose schema
const noteSchema = new mongoose.Schema({
  name: String,
  notes: [
    {
      noteTitle: String,
      noteContent: String,
    },
  ],
});
const Note = mongoose.model("note", noteSchema);
module.exports = Note;
