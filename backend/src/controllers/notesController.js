import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}) // newest first;
        res.status(200).json(notes)
    }
    catch (error){
        console.error("error in getAllNotes controller : ", error);
        res.status(500).json({message:"Internal server error"});
    }
}


export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});

        res.json(note)
    } catch (error) {
        console.error("error in getNoteById controller : ", error);
        res.status(500).json({message:"Internal server error"});
    }
}

// export function getAllNotes (req, res) {
//     res.status(200).send("You just fetched the notes.");
// }

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;  // Make sure this matches frontend
        const newNote = new Note({ title, content });

        const saveNote = await newNote.save();
        res.status(201).json(saveNote);
    } catch (error) {
        console.error("error in createNote:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// export async function createNote (req, res) {
//     // res.status(201).json({message:"Note created successfully."})
//     try {
//         const {title, content} = req.body;
//         const newNote = new Note({title, content})

//         await newNote.save()
//         res.status(201).json({message:"Notes created successfully!"})

//     } catch (error) {
//         console.error("error in createNote : ", error);
//         res.status(500).json({message:"Internal server error"});
//     }
// }

export async function updateNote  (req, res) {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(updatedNote)
    } catch (error) {
         console.error("error in updateNote controller : ", error);
        res.status(500).json({message:"Internal server error"});
    }
}


export async function deleteNote (req, res) {
    try {
        
    const {title, content} = req.body
    const deletedNote = await Note.findByIdAndDelete(req.params.id,);

    if(!deletedNote) return res.status(404).json({message:"Note not found."})
    res.status(200).json(deletedNote)

    } catch (error) {
        console.error("error in deleteNote : ", error);
        res.status(500).json({message:"Internal server error"});    
    }
}


