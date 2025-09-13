import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa'
import { MainContext } from '../ContextMain'
import axios from 'axios'

export default function Navbar() {
    const { user, isMenuOpen, setIsMenuOpen, BackendBaseUrl, setUser } = useContext(MainContext)

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isMenuOpen])



    const handleLogout = () => {

        axios.get(BackendBaseUrl + '/auth/logout', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setUser(null);
            })
            .catch(err => {
                console.error(err);
            });
    }
    return (
        <header className="bg-gray-800/80 backdrop-blur sticky top-0 z-30 border-b border-gray-700">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/" className="text-xl font-bold text-pink-300">DevTrail</Link>
                    <p className="text-sm text-gray-400">Share knowledge</p>
                </div>

                <nav className="flex items-center gap-4">
                    {/* mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <FaBars />
                    </button>

                    {
                        user ?
                            <Link to="/dashboard" className="hidden md:inline-block text-gray-300 hover:text-pink-200">Dashboard</Link> :
                            <Link to="/" className="hidden md:inline-block text-gray-300 hover:text-pink-200">Home</Link>
                    }
                    {user ? (
                        <Link className="hidden md:inline-block px-3 py-1 rounded-md bg-pink-300 text-gray-900 hover:bg-pink-400" onClick={handleLogout}>logout</Link>
                    ) : (
                        <Link to="/login" className="hidden md:inline-block px-3 py-1 rounded-md bg-pink-300 text-gray-900 hover:bg-pink-400">Sign in</Link>
                    )}
                </nav>
            </div>

            {/* Mobile slide-in menu */}
            <div
                className={`fixed inset-0 h-[100vh] w-full z-[9999] md:hidden ${isMenuOpen ? '' : 'pointer-events-none'}`}
                aria-hidden={!isMenuOpen}
            >
                {/* backdrop */}
                <div
                    className={`absolute inset-0 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* sliding panel */}
                <aside
                    className={`absolute left-0 top-0 h-[100vh] w-[70%] bg-gray-900 backdrop-blur p-4 transform transition-transform duration-350 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-[10000]`}
                    role="dialog"
                    aria-modal="true"
                >
                    <nav className="mt-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between cursor-pointer">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-pink-300">DevTrail</Link>
                            <button className="text-gray-300 p-2 cursor-pointer" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                                <FaTimes />
                            </button>
                        </div>

                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 text-gray-200">
                            <FaGithub className="text-pink-300" /> Dashboard
                        </Link>

                        <Link to="/dashboard/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 text-gray-200">
                            <span className="text-pink-300">👤</span> My Profile
                        </Link>

                        <div className="mt-4 px-3 text-sm text-gray-400">
                            <p>Pro tip: Use the left menu to navigate.</p>
                        </div>
                    </nav>
                </aside>
            </div>
        </header>
    )
}
36