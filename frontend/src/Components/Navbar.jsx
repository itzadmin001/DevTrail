import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { MainContext } from '../ContextMain'

export default function Navbar() {
    const { user } = useContext(MainContext)
    return (
        <header className="bg-gray-800/80 backdrop-blur sticky top-0 z-30 border-b border-gray-700">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/" className="text-xl font-bold text-pink-300">DevTrail</Link>
                    <p className="text-sm text-gray-400">Share knowledge</p>
                </div>

                <nav className="flex items-center gap-4">
                    {
                        user ?
                            <Link to="/dashboard" className="text-gray-300 hover:text-pink-200">Dashboard</Link> :
                            <Link to="/" className="text-gray-300 hover:text-pink-200">Home</Link>
                    }
                    {user ? (
                        <Link className="px-3 py-1 rounded-md bg-pink-300 text-gray-900 hover:bg-pink-400">logout</Link>
                    ) : (
                        <Link to="/login" className="px-3 py-1 rounded-md bg-pink-300 text-gray-900 hover:bg-pink-400">Sign in</Link>
                    )}
                </nav>
            </div>
        </header>
    )
}
