import React from 'react'
import { Link } from 'react-router-dom'
import { FaThLarge, FaFileAlt, FaUser } from 'react-icons/fa'

export default function Dashboard() {
    return (
        <div>
            <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .fade-up { animation: fadeUp 600ms ease both; }
      `}</style>

            <div className="grid grid-cols-12 gap-6">
                <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-gray-800/70 rounded-lg p-4 shadow-md">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-pink-300">DevTrail</h2>
                        <p className="text-sm text-gray-400">Build. Share. Learn.</p>
                    </div>

                    <nav className="space-y-2">
                        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <FaThLarge className="text-pink-300" /> <span>Dashboard</span>
                        </Link>

                        <Link to="/dashboard/markdowns" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <FaFileAlt className="text-pink-300" /> <span>All MarkDowns</span>
                        </Link>

                        <Link to="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <FaUser className="text-pink-300" /> <span>My Profile</span>
                        </Link>
                    </nav>

                    <div className="mt-6 text-sm text-gray-400">
                        <p>Pro tip: Use the left menu to navigate.</p>
                    </div>
                </aside>

                <section className="col-span-12 md:col-span-9 lg:col-span-10">
                    <div className="bg-gray-800/70 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Overview</h3>
                            <div className="text-sm text-gray-400">Welcome back, User</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-gray-800 rounded-md fade-up">
                                <div className="text-sm text-gray-400">Articles</div>
                                <div className="text-2xl font-bold text-white">24</div>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-md fade-up" style={{ animationDelay: '80ms' }}>
                                <div className="text-sm text-gray-400">Drafts</div>
                                <div className="text-2xl font-bold text-white">3</div>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-md fade-up" style={{ animationDelay: '160ms' }}>
                                <div className="text-sm text-gray-400">Likes</div>
                                <div className="text-2xl font-bold text-white">1.2k</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium mb-2 text-white">Recent MarkDowns</h4>
                            <div className="space-y-3">
                                <article className="p-3 rounded-md border border-gray-700 hover:shadow">
                                    <h5 className="font-semibold text-white">Getting started with DevTrail</h5>
                                    <p className="text-sm text-gray-400">A quick guide to start publishing markdowns.</p>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
