import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaThLarge, FaFileAlt, FaUser, FaPlus } from 'react-icons/fa'
import MarkDown from '../Components/MarkDown'
import { IoMdCloseCircle } from "react-icons/io";
import { MainContext } from '../ContextMain';
import axios from 'axios';
import { FaRegShareSquare } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";


export default function Dashboard() {
    const [editorOpen, setEditorOpen] = useState(false)
    const { auth, user, markdowns, fetchMarkDownsData, fetchUserProfile, BackendBaseUrl } = useContext(MainContext)
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    // Filter state for tags
    const [filterTag, setFilterTag] = useState('All')

    // derive tag list from user's markdowns
    const allTags = React.useMemo(() => {
        const setTags = new Set();
        (markdowns || []).forEach(m => (m.tags || []).forEach(t => setTags.add(t)))
        return ['All', ...Array.from(setTags)]
    }, [markdowns])

    // filtered markdowns based on selected tag
    const filteredMarkdowns = React.useMemo(() => {
        if (!markdowns) return []
        if (filterTag === 'All') return markdowns
        return markdowns.filter(m => (m.tags || []).includes(filterTag))
    }, [markdowns, filterTag])

    useEffect(() => {
        fetchMarkDownsData()
        fetchUserProfile()

    }, [])


    useEffect(() => {
        if (editorOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [editorOpen])




    return (
        <div>

            <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .fade-up { animation: fadeUp 600ms ease both; }
      `}</style>

            <div className="grid grid-cols-12 gap-6 z-10 ">
                <aside className="hidden md:block md:col-span-3 lg:col-span-3 bg-gray-800/70 rounded-lg p-4 shadow-md">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-pink-300">DevTrail</h2>
                        <p className="text-sm text-gray-400">Build. Share. Learn.</p>
                    </div>

                    <nav className="space-y-2">
                        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <FaThLarge className="text-pink-300" /> <span>Dashboard</span>
                        </Link>



                        <Link to="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <FaUser className="text-pink-300" /> <span>My Profile</span>
                        </Link>
                    </nav>

                    <div className="mt-6 text-sm text-gray-400">
                        <p>Pro tip: Use the left menu to navigate.</p>
                    </div>
                </aside>


                <section className="col-span-12 md:col-span-9 lg:col-span-9">
                    <div className="bg-gray-800/70 rounded-lg p-6 shadow-md min-h-[80vh]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Overview</h3>
                            <div className=' flex items-center gap-2'>
                                <div className="text-sm text-gray-400">Welcome back, {user?.displayName
                                    || 'User'}</div>
                                <button onClick={() => setEditorOpen(true)} className='bg-blue-500 px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform'>
                                    <span className="text-white font-medium">New</span>
                                    <FaPlus size={15} className="text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-gray-800 rounded-md fade-up">
                                <div className="text-sm text-gray-400">Articles</div>
                                <div className="text-2xl font-bold text-white">{markdowns?.length}</div>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-md fade-up" style={{ animationDelay: '80ms' }}>
                                <div className="text-sm text-gray-400">Public</div>
                                <div className="text-2xl font-bold text-white">{
                                    markdowns.filter(item => item.Visibility === 'public').length}</div>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-md fade-up" style={{ animationDelay: '160ms' }}>
                                <div className="text-sm text-gray-400">Private</div>
                                <div className="text-2xl font-bold text-white">{
                                    markdowns.filter(item => item.Visibility === 'private').length}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <h4 className="text-lg font-medium text-white">Recent MarkDowns</h4>

                                {/* dropdown for small screens */}
                                <div className="flex items-center gap-2">
                                    <label className="sr-only">Filter by tag</label>
                                    <select
                                        value={filterTag}
                                        onChange={(e) => setFilterTag(e.target.value)}
                                        className="block sm:hidden bg-gray-800 cursor-pointer text-gray-200 px-3 py-2 rounded-md border border-gray-700"
                                    >
                                        {allTags.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>

                                    {/* pill buttons for larger screens */}
                                    <div className="hidden sm:flex flex-wrap gap-2">
                                        {allTags.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setFilterTag(t)}
                                                className={`text-xs px-3 py-1 rounded-full cursor-pointer transition ${filterTag === t ? 'bg-pink-300 text-gray-900' : 'bg-gray-800/60 text-gray-200 hover:bg-gray-700'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 text-sm text-gray-400">
                                Showing <span className="text-gray-200 font-medium">{filteredMarkdowns.length}</span> of <span className="text-gray-200 font-medium">{markdowns?.length || 0}</span> markdowns {filterTag !== 'All' && <>for tag "<span className="font-semibold text-white">{filterTag}</span>"</>}
                            </div>
                        </div>

                        <div className=' mt-5'>
                            <h1 className=' mb-5 text-2xl font-bold text-white'>MarksDown</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                {filteredMarkdowns.map((markdown, i) => {
                                    const key = markdown._id || i

                                    return (
                                        <Link key={key} to={`/dashboard/view/${markdown._id || i}`} className="block">
                                            <article className="min-w-62 cursor-pointer bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-transform">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h2 className="text-lg font-semibold text-white">{markdown.title || 'Untitled'}</h2>
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${markdown.Visibility === 'Public' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                                        {markdown.Visibility}
                                                    </span>
                                                </div>
                                                <p className="mt-3 text-sm text-gray-300 max-h-[4.5rem] overflow-hidden">
                                                    {markdown.content || 'No content available.'}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {(markdown.tags || []).map((tag, idx) => (

                                                        <span key={idx} className="text-xs bg-blue-600/90 text-white px-2 py-1 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="text-xs text-gray-400">{new Date(markdown?.createdAt || Date.now()).toLocaleDateString()}</div>

                                                </div>
                                            </article>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* MarkDown Modal */}
            {editorOpen && (
                <div>
                    <MarkDown />
                    <div className="fixed flex items-center animate-pulse gap-1 top-6 right-8 z-50 cursor-pointer bg-red-600 text-white px-8 py-2 rounded-md shadow-lg hover:bg-red-700 transition">
                        <button
                            onClick={() => setEditorOpen(false)}

                        >
                            Close
                        </button>
                        <IoMdCloseCircle size={18} />
                    </div>
                </div>
            )}
        </div>
    )
}
