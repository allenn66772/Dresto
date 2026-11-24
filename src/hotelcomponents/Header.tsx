import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-[#148873] flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Dresto
                    </span>
                </a>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                   <Link to="/owner/dashboard">
                        <a href="#features" className="hover:text-slate-900 transition-colors">
                            Dashboard
                        </a>
                   </Link>
                    <button className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                        Solutions <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                    <Link to="/select-plan">
                        <a href="#pricing" className="hover:text-slate-900 transition-colors">
                            Pricing
                        </a>
                    </Link>
                    <button className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                        Resources <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                    <a href="#testimonials" className="hover:text-slate-900 transition-colors">
                        Testimonials
                    </a>
                </nav>

                {/* Auth & CTA */}
                <div className="flex items-center gap-3">
                    <Link to="/owner/register">
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            Sign In
                        </button>
                    </Link>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#148873] rounded-lg hover:bg-[#10705e] shadow-sm transition-colors">
                        Start Free Trial
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header