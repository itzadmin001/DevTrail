import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import ViewMarkDown from './Components/ViewMarkDown'
import Userprofile from './Pages/Userprofile'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 font-sans">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/view/:id" element={<ViewMarkDown />} />
            {/* explicit token param so shared link loads UI */}
            <Route path="/markdowns/shared/:token" element={<Userprofile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
