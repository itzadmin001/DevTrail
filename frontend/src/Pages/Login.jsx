import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { MainContext } from '../ContextMain'

export default function Login() {
    const navigate = useNavigate()
    const { SetAuth } = useContext(MainContext)
    const api = import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000'


    function handleLogin(e) {
        e.preventDefault()
        // simulate login
        navigate('/dashboard')
    }


    return (
        <div>
            <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .fade-up { animation: fadeUp 600ms ease both; }
      `}</style>

            <div className="max-w-md mx-auto bg-gray-800/70 text-gray-100 backdrop-blur-md rounded-xl shadow-lg p-8 mt-20">
                <header className="mb-6 text-center fade-up">
                    <h1 className="text-2xl font-semibold text-pink-300">Welcome back</h1>
                    <p className="text-sm text-gray-300">Sign in to continue to DevTrail</p>
                    <span className="text-sm text-red-400">Login with GitHub only </span>
                </header>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="fade-up">
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" required className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:border-pink-300 focus:ring-pink-300 p-2" placeholder="you@company.com" />
                    </div>

                    <div className="fade-up" style={{ animationDelay: '80ms' }}>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input type="password" required className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:border-pink-300 focus:ring-pink-300 p-2" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 rounded-md bg-pink-300 hover:bg-pink-400 text-gray-900 font-medium fade-up" style={{ animationDelay: '160ms' }}>Sign in</button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-300">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            // Start OAuth by full-page redirect to backend auth route
                            window.location.href = `${api}/auth/github`;
                            SetAuth(true)
                        }}
                        className="w-full cursor-pointer hover:bg-pink-400 hover:text-black duration-300  flex items-center justify-center gap-2 py-2 border border-gray-600 rounded-md hover:shadow-sm bg-transparent text-gray-100 fade-up"
                        style={{ animationDelay: '200ms' }}>
                        <FaGithub className="text-xl text-pink-300" />
                        <span>Continue with GitHub</span>
                    </button>

                    <p className="text-center text-sm text-gray-400 fade-up" style={{ animationDelay: '240ms' }}>
                        Don't have an account?{' '}
                        <Link to="/" className="text-pink-300 hover:underline">Get started</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
