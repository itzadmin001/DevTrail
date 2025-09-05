import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaThLarge, FaFileAlt, FaUser, FaPlus } from 'react-icons/fa'
import MarkDown from '../Components/MarkDown'
import { IoMdCloseCircle } from "react-icons/io";
import { MainContext } from '../ContextMain';
import axios from 'axios';
import { FaRegShareSquare } from "react-icons/fa";



export default function Dashboard() {
    const [editorOpen, setEditorOpen] = useState(false)
    const { auth, user, markdowns, setMarkDowns, BackendBaseUrl } = useContext(MainContext)

    const navigate = useNavigate()




    useEffect(() => {
        axios.get(BackendBaseUrl + "/markdowns", {
            withCredentials: true
        })
            .then((success) => {
                setMarkDowns(success.data.data)
            }).catch((err) => {
                console.log(err)
            })


    }, [])


    useEffect(() => {
        if (editorOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [editorOpen])

    console.log(markdowns)
    return (
        <div>

            <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .fade-up { animation: fadeUp 600ms ease both; }
      `}</style>

            <div className="grid grid-cols-12 gap-6 ">
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
                                <div className="text-2xl font-bold text-white">3</div>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-md fade-up" style={{ animationDelay: '160ms' }}>
                                <div className="text-sm text-gray-400">Private</div>
                                <div className="text-2xl font-bold text-white">1.2</div>
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
                        <div className=' mt-5'>
                            <h1 className=' mb-5 text-2xl font-bold text-white'>MarksDown</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                                {markdowns?.map((markdown, i) => {
                                    const key = markdown._id || i

                                    return (
                                        <article key={key} className="min-w-62 cursor-pointer bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-transform">
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

                                                <div className=' flex items-center gap-1  border-[1px] text-sm cursor-pointer  px-4 py-1 rounded-full'>
                                                    <button>Share</button>
                                                    <FaRegShareSquare />
                                                </div>
                                            </div>
                                        </article>
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
