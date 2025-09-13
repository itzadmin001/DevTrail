import React, { useContext } from 'react'
import { MainContext } from '../ContextMain'
import { FaRegCopy, FaEdit } from 'react-icons/fa'

function Profile() {
    const { user, markdowns } = useContext(MainContext)

    const getInitials = (name = '') => {
        const parts = name.trim().split(' ').filter(Boolean)
        if (parts.length === 0) return 'U'
        if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }

    const avatar = user?.avatarUrl || user?.profileUrl || ''
    const displayName = user?.displayName || 'User'
    const username = user?.username || user?.gitHubId || ''


    console.log(user)

    return (
        <div className="min-h-[70vh] flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl">
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-2xl p-8 shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="relative">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-gray-800 shadow-md"
                                />
                            ) : (
                                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-pink-300 to-blue-500 flex items-center justify-center text-2xl font-semibold text-white border-4 border-gray-800 shadow-md">
                                    {getInitials(displayName)}
                                </div>
                            )}

                            <div className="absolute -bottom-3 right-0 bg-pink-300 text-black text-xs px-3 py-1 rounded-full shadow-md hidden sm:inline-flex items-center gap-2">
                                <FaEdit /> Edit
                            </div>
                        </div>

                        {/* Name */}

                        <div className=' flex items-center gap-3 mt-5'>
                            <h1

                                className='text-sm  text-gray-500'
                            >{username}</h1>
                            <button
                                onClick={() => navigator.clipboard?.writeText(displayName)}
                                title="Copy username"
                                className="text-gray-300 bg-gray-800/50 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-md transition"
                            >
                                <FaRegCopy size={15} />
                            </button>
                        </div>
                        {/* Username (read-only) */}
                        <div className="mt-3 flex items-center gap-3">
                            <div className="text-sm text-gray-400">@</div>
                            <input className="bg-gray-800/60 text-gray-200 text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none w-44 sm:w-56" value={displayName} readOnly />


                        </div>

                        {/* Bio */}
                        <div className="mt-6 w-full">
                            <h3 className="text-sm text-gray-400 mb-2">Bio</h3>
                            <div className="bg-gray-800 rounded-md border border-gray-700 p-4 text-sm text-gray-300 min-h-[88px]">
                                {user?.bio ? user.bio : <span className="text-gray-500">No bio provided.</span>}
                            </div>
                        </div>

                        {/* Optional small stats row */}
                        <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-gray-800/60 rounded-md p-3 text-center border border-gray-700">
                                <div className="text-xs text-gray-400">Articles</div>
                                <div className="text-lg font-bold text-white">{markdowns?.length ?? 0}</div>
                            </div>
                            <div className="bg-gray-800/60 rounded-md p-3 text-center border border-gray-700">
                                <div className="text-xs text-gray-400">Visibility</div>
                                <div className="text-lg font-bold text-white">Public</div>
                            </div>
                            <div className="bg-gray-800/60 rounded-md p-3 text-center border border-gray-700">
                                <div className="text-xs text-gray-400">Joined</div>
                                <div className="text-lg font-bold text-white">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
