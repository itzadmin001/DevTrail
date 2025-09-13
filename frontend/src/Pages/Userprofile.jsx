import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../ContextMain";
import { FaArrowLeft } from "react-icons/fa";

export default function Userprofile() {
    const { token, id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { BackendBaseUrl, user: currentUser } = useContext(MainContext);

    const shareToken = token || searchParams.get("share") || null;
    const userIdFromRoute = id || null;

    const [owner, setOwner] = useState(null);
    const [sharedCard, setSharedCard] = useState(null);
    const [ownerCount, setOwnerCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function fetchShared() {
            try {
                setLoading(true);
                if (shareToken) {
                    const res = await axios.get(`${BackendBaseUrl}/markdowns/shared/${shareToken}`);
                    if (!mounted) return;
                    const { owner, markdown, ownerCount } = res.data.data || {};
                    setOwner(owner || null);
                    setSharedCard(markdown || null);
                    setOwnerCount(ownerCount || 0);
                } else if (userIdFromRoute) {
                    const res = await axios.get(`${BackendBaseUrl}/users/public/${userIdFromRoute}`);
                    if (!mounted) return;
                    setOwner(res.data.data.user || null);
                    setOwnerCount((res.data.data.markdowns || []).length || 0);
                    // do not show list here — requirement is to show member and counts only
                } else {
                    if (currentUser) {
                        setOwner(currentUser);
                        const res = await axios.get(`${BackendBaseUrl}/markdowns`, { withCredentials: true });
                        if (!mounted) return;
                        setOwnerCount(res.data.data?.length || 0);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchShared();
        return () => { mounted = false; }
    }, [BackendBaseUrl, shareToken, userIdFromRoute, currentUser]);

    if (loading) {
        return <div className="p-6 min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <button onClick={() => navigate(-1)} className="px-2 cursor-pointer py-1 rounded bg-gray-800/60 text-gray-200">
                    <FaArrowLeft />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-white">{owner?.displayName || "User"}</h1>
                    <div className="text-sm text-gray-400">{owner?.bio || "No bio provided."}</div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-4 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                    <img src={owner?.avatar || '/vite.svg'} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-400">Member</div>
                                <div className="text-lg font-semibold text-white">{owner?.displayName}</div>
                                <div className="text-xs text-gray-400 mt-1">{ownerCount} markdown{ownerCount === 1 ? '' : 's'}</div>
                            </div>
                            <div className="text-right text-xs text-gray-400">
                                <div>{owner?.email || ""}</div>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-300 text-sm">{owner?.bio}</p>
                    </div>
                </div>

                {sharedCard ? (
                    <div className="mt-4 p-3 bg-gray-800/60 border border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between">
                            <h3 className="text-white font-semibold">{sharedCard.title || "Untitled"}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${String(sharedCard.Visibility || "").toLowerCase() === "public" ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}`}>
                                {sharedCard.Visibility}
                            </span>
                        </div>
                        <pre className="mt-2 text-sm text-gray-300 whitespace-pre-wrap break-words">{sharedCard.content}</pre>
                        <div className="mt-3 text-xs text-gray-400">{new Date(sharedCard.createdAt || Date.now()).toLocaleString()}</div>
                    </div>
                ) : (
                    <div className="mt-4 p-3 text-sm text-gray-400">No shared markdown available or it's not public.</div>
                )}
            </div>
        </div>
    );
}