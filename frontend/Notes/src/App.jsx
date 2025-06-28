import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import toast from 'react-hot-toast'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="relative h-full w-full">
      {/* <div className="flex justify-between items-center mb-4">
        <button onClick={() => toast.error("clicked")} className="btn btn-outline">
          click me
        </button>
        <ThemeToggle />
      </div> */}

       <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
