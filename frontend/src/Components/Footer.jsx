import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-sky-600 mt-8 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-white">
                <div>© {new Date().getFullYear()} DevTrail — Built with ❤️</div>
                <div className="mt-2">
                    <Link to="/" className="mr-4 hover:underline">Home</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                </div>
            </div>
        </footer>
    )
}
