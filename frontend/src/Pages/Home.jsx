import React from 'react'
import { Link } from 'react-router-dom'
import { FaRocket, FaLock, FaUsers, FaRegLightbulb } from 'react-icons/fa'

function Feature({ icon, title, desc }) {
    return (
        <div className="bg-gray-800/60 backdrop-blur rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-pink-300 text-2xl mb-3">{icon}</div>
            <h4 className="font-semibold text-lg mb-1 text-white">{title}</h4>
            <p className="text-sm text-gray-300">{desc}</p>
        </div>
    )
}

export default function Home() {
    return (
        <div className="space-y-12">
            <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .bg-animated-gradient { background: linear-gradient(270deg,#1f2937,#111827,#0f172a); background-size: 600% 600%; animation: gradientShift 10s ease infinite; }
        .float-anim { transform-origin: center; animation: float 6s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-8px) } 100% { transform: translateY(0px) } }
      `}</style>

            {/* Hero */}
            <section className="relative overflow-hidden rounded-xl">
                <div className="bg-animated-gradient py-16 px-4">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-pink-300 leading-tight">
                                Career journaling for developers
                            </h1>
                            <p className="mt-4 text-lg text-gray-300 max-w-xl">
                                Log learning progress, wins, and roadblocks — public or private. Build a habit of reflecting, grow your portfolio, and tell your story as you code.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link to="/login" className="inline-flex items-center gap-2 bg-pink-300 hover:bg-pink-400 text-gray-900 px-5 py-3 rounded-lg shadow-md">Get started</Link>
                                <a href="#features" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-700 hover:bg-gray-800">Why DevTrail</a>
                            </div>

                            <div className="mt-6 text-sm text-gray-300">
                                <strong>One-liner:</strong> Career journaling app where devs log learning progress, wins, and roadblocks — public or private.
                            </div>

                            <div className="mt-4 text-sm text-gray-300 max-w-lg">
                                <strong>Problem solved:</strong> Helps devs build a habit of logging growth and reflecting — like a career diary meets portfolio. Keep a private journal or publish insights to showcase progress.
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <div className="relative w-full max-w-md">
                                <div className="float-anim rounded-2xl p-6 bg-gray-800/80 shadow-2xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm text-gray-400">DevTrail • Journal</div>
                                        <div className="text-xs text-emerald-400">Live</div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="h-3 bg-gray-700 rounded-full w-3/4 animate-pulse"></div>
                                        <div className="h-3 bg-gray-700 rounded-full w-1/2 animate-pulse"></div>
                                        <div className="h-3 bg-gray-700 rounded-full w-2/3 animate-pulse"></div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 text-center text-gray-200">New</div>
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 text-center text-gray-200">Drafts</div>
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 text-center text-gray-200">Public</div>
                                    </div>
                                </div>




                                <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-pink-400 opacity-30 filter blur-2xl"></div>
                                <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-sky-400 opacity-20 filter blur-2xl"></div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-pink-300">How DevTrail helps you</h2>
                    <p className="text-gray-300 mt-2 max-w-2xl mx-auto">Turn small daily entries into a visible growth timeline. Share select entries as portfolio pieces or keep them private for personal reflection.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Feature icon={<FaRegLightbulb />} title="Log & Reflect" desc="Capture daily wins, notes, and roadblocks. Reflection turns experience into learning." />
                    <Feature icon={<FaRocket />} title="Showcase Growth" desc="Publish selected entries as part of your public portfolio — demonstrate steady progress." />
                    <Feature icon={<FaLock />} title="Private Mode" desc="Keep a private journal to be honest with yourself. Toggle visibility per entry." />
                    <Feature icon={<FaUsers />} title="Community & Feedback" desc="Share entries to get feedback and build connections — or keep them private." />
                </div>
            </section>

            {/* How it works */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-semibold text-pink-300">How it works</h3>
                        <p className="text-gray-300 mt-2">Simple workflow to maintain momentum and create shareable milestones.</p>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-none w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-pink-300">1</div>
                            <div>
                                <h4 className="font-semibold text-white">Quick entries</h4>
                                <p className="text-sm text-gray-300">Add short notes about what you learned, stuck on, or shipped — takes under two minutes.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-none w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-pink-300">2</div>
                            <div>
                                <h4 className="font-semibold text-white">Tag & categorize</h4>
                                <p className="text-sm text-gray-300">Label entries with topics, tools, or project names to build a searchable timeline.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-none w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-pink-300">3</div>
                            <div>
                                <h4 className="font-semibold text-white">Share when ready</h4>
                                <p className="text-sm text-gray-300">Choose entries to make public — they become part of your live portfolio and story.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA banner */}
            <section className="container mx-auto px-4">
                <div className="rounded-xl bg-pink-700 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-2xl font-bold">Start your DevTrail today</h4>
                        <p className="mt-1 text-pink-100/90">Create a free account, log your first entry, and watch your growth over time.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/login" className="bg-white text-pink-700 px-5 py-3 rounded-lg font-semibold">Create account</Link>
                        <a href="#features" className="border border-white/30 px-4 py-3 rounded-lg">Learn more</a>
                    </div>
                </div>
            </section>

        </div>
    )
}
