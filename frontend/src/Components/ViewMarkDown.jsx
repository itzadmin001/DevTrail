import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { MainContext } from '../ContextMain'
import { FaArrowLeft, FaClipboard, FaExternalLinkAlt } from 'react-icons/fa'

function ViewMarkDown() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { BackendBaseUrl } = useContext(MainContext)

    const [markdown, setMarkdown] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        let mounted = true
        async function fetchMarkdown() {
            try {
                setLoading(true)
                const res = await axios.get(`${BackendBaseUrl}/markdowns/${id}`, { withCredentials: true })
                if (!mounted) return
                setMarkdown(res.data?.data || null)
            } catch (err) {
                if (!mounted) return
                setError(err?.response?.data?.message || err.message || 'Failed to load')
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchMarkdown()
        return () => { mounted = false }
    }, [BackendBaseUrl, id])

    // openNewTab: when true opens the frontend share URL in a new tab after copying
    const onShareCreate = async (openNewTab = false) => {
        try {
            const res = await axios.post(`${BackendBaseUrl}/markdowns/${id}/share`, {}, { withCredentials: true })
            const token = res.data?.data?.token
            if (token) {
                // Use frontend origin so opening link loads React route (not backend JSON)
                const url = `${window.location.origin}/markdowns/shared/${token}`
                await navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
                if (openNewTab) {
                    // open in new tab (noopener for security)
                    window.open(url, '_blank', 'noopener,noreferrer')
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return (
            <div className="p-6 min-h-[60vh] flex items-center justify-center">
                <div className="text-gray-400">Loading markdown...</div>
            </div>
        )
    }

    if (error || !markdown) {
        return (
            <div className="p-6 min-h-[60vh]">
                <button onClick={() => navigate(-1)} className="inline-flex cursor-pointer items-center gap-2 text-sm text-pink-300 mb-4">
                    <FaArrowLeft /> Back
                </button>
                <div className="bg-gray-800/70 p-6 rounded-md text-red-400 ">
                    {error || 'Markdown not found.'}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="flex  cursor-pointer items-center gap-2 text-sm bg-gray-800/60 px-3 py-2 rounded-md hover:bg-gray-700">
                        <FaArrowLeft /> Back
                    </button>
                    <h1 className="text-2xl font-bold text-white">{markdown.title || 'Untitled'}</h1>
                </div>
            </div>

            <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                <div className="bg-gradient-to-br  from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-xs text-gray-400">Visibility</div>
                            <div className={`mt-1 inline-block text-sm font-medium px-3 py-1 rounded-full ${markdown.Visibility === 'Public' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                {markdown.Visibility}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-xs text-gray-400">Created</div>
                            <div className="text-sm text-gray-200">{new Date(markdown.createdAt || Date.now()).toLocaleString()}</div>
                            {markdown.updatedAt && <div className="text-xs text-gray-400 mt-2">Updated</div>}
                            {markdown.updatedAt && <div className="text-sm text-gray-200">{new Date(markdown.updatedAt).toLocaleString()}</div>}
                        </div>
                    </div>

                    <hr className="my-4 border-gray-700" />

                    <div className="prose prose-invert max-w-none text-gray-100" style={{ whiteSpace: 'pre-wrap' }}>
                        {markdown.content || 'No content available.'}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {(markdown.tags || []).map((t, idx) => (
                                <span key={idx} className="text-xs bg-blue-600/90 text-white px-2 py-1 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => onShareCreate(false)} className="flex items-center cursor-pointer gap-2 bg-blue-600 px-3 py-2 rounded-md text-white hover:bg-blue-700">
                                <FaClipboard /> {copied ? 'Copied link' : 'Copy Link'}
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMarkDown
