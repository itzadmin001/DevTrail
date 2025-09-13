import React, { useContext, useState } from "react";
import { marked } from "marked";
import axios from "axios";
import { MainContext } from "../ContextMain";

function MarkDown() {
    const { BackendBaseUrl, user, markdowns, fetchMarkDownsData, setMarkDowns } = useContext(MainContext)
    const [title, setTitle] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const handleAddTag = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            tags,
            content,
            visibility: isPublic ? "public" : "private",
        };
        formData.id = user.id
        if (!formData.title || !formData.content || formData.tags.length === 0 || !formData.visibility) {
            console.error("All fields are required.");
            return;
        }

        axios.post(BackendBaseUrl + "/markdowns/create", formData,
            {
                withCredentials: true
            }
        ).then((success) => {
            console.log(success)
            fetchMarkDownsData()
        }).catch((err) => {
            console.log(err)
        })
        setTitle("");
        setTags([]);
        setContent("");

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 py-2">
            <div
                className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 rounded-2xl shadow-2xl p-6 animate-modalOpen "
                style={{ minHeight: "80vh" }}
            >
                {/* LEFT: Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col gap-4 "
                >
                    <h2 className="text-2xl font-bold text-gray-100">Create Entry</h2>

                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Entry title..."
                            className="w-full border border-gray-700 rounded-lg p-2 focus:ring focus:ring-blue-200 bg-gray-800 text-gray-100"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Tags Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-1">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        className="text-red-400 hover:text-red-600"
                                        onClick={() => handleRemoveTag(index)}
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Press Enter to add tag"
                            className="w-full border border-gray-700 rounded-lg p-2 focus:ring focus:ring-blue-200 bg-gray-800 text-gray-100"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                    </div>

                    {/* Markdown Textarea */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-1">
                            Markdown Content
                        </label>
                        <textarea
                            placeholder="Write your markdown content..."
                            className="w-full h-40 border border-gray-700 rounded-lg p-2 focus:ring focus:ring-blue-200 resize-none bg-gray-800 text-gray-100"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    {/* Visibility Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-300">Visibility</span>
                        <div className="flex items-center gap-2">
                            <span className={`${isPublic ? "text-blue-400" : "text-gray-500"}`}>
                                {isPublic ? "Public" : "Private"}
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsPublic(!isPublic)}
                                className={`w-12 h-6 cursor-pointer flex items-center rounded-full p-1 transition ${isPublic ? "bg-blue-500" : "bg-gray-700"
                                    }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${isPublic ? "translate-x-6" : "translate-x-0"
                                        }`}
                                ></div>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                    >
                        Submit
                    </button>
                </form>

                {/* RIGHT: Live Preview */}
                <div className="bg-gray-900 p-6 rounded-2xl shadow-md overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 text-gray-100">Live Preview</h2>

                    {/* Preview Title */}
                    {title && <h1 className="text-xl font-bold text-gray-100">{title}</h1>}

                    {/* Preview Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-green-600 text-white px-2 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Markdown Rendered Preview */}
                    <div
                        className="mt-4 prose max-w-none text-gray-200 whitespace-pre-wrap break-words "
                        style={{ overflowWrap: "anywhere" }}
                        dangerouslySetInnerHTML={{ __html: marked(content || "") }}
                    />

                    {/* Visibility Info */}
                    <div className="mt-4 text-sm ">
                        <span
                            className={`px-2 py-1 r rounded-full text-xs ${isPublic ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {isPublic ? "Public" : "Private"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarkDown;
