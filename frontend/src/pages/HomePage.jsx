import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimite from '../components/RateLimite.jsx';
import { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';

function HomePage() {
    const [isRateLimited, setIsRateLimit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                // const data = await res.json();
                console.log(res.data)

                setNotes(res.data);
                setIsRateLimit(false);
            } catch (error) {
                console.log("Error fetching notes");
                console.log(error)
                if(error.response?.status === 429){
                    setIsRateLimit(true)
                }
                else{
                    toast.error("failed to load notes.")
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    },[])

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
)
}

export default HomePage
// <div className="min-h-screen">
//     <Navbar />
//     {isRateLimit && <RateLimite />}



//     <div className='max-w-7xl max-auto p-4 mt-6'>
//         {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

//         {notes.length === 0 && !isRateLimit && <NotesNotFound />}

//         {notes.length > 0 && !isRateLimit && (
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//                 {notes.map( (note) => (
//                     <div>
//                         {/* console.log(" notes app : ",note.title); */}
        
//                         {/* {note.title} | {note.content} */}
//                         <NoteCard key={note._id} {...note} setNotes={setNotes} />
//                     </div>
//                 ))} 

//             </div>
//         )}
//     </div>
// </div>