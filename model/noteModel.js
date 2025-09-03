const { Schema, default: mongoose } = require('mongoose');


const notesSchema = new Schema ( 
    {
        title: { type: String, required: false },
        body: { 
            type: String,
            required: [false, 'Please provide note details'],
            
        },
        done: Boolean,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'noteUsers', required: true}
    }
)

const NoteModel = mongoose.model('notes', notesSchema)
module.exports = NoteModel;
