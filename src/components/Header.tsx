import React from 'react';
import { NavLink } from 'react-router-dom';
import { Verified } from 'lucide-react';

export function Header() {
    return (
        <header className="fixed w-full z-50">
            <nav className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between h-16 rounded-lg backdrop-blur-lg bg-indigo-100/60"> 
                    <div className="flex items-justify">
                        <NavLink to="/" className="flex items-justify">
                            <Verified className="h-8 w-8 text-indigo-600 ml-8" />
                            <span className="ml-2 text-indigo-600 font-bold text-xl">fotodile</span>
                        </NavLink>
                    </div>
                    <div className="flex space-x-4">
                        <NavLink
                            to="/unisearch"
                            className={({ isActive }) =>
                                `text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-100 text-indigo-800' : ''}`
                            }
                        >
							Search User
                        </NavLink>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-100 text-indigo-800' : ''}`
                            }
                        >
                            Instagram Verification
                        </NavLink>
                        <NavLink
                            to="/twitter"
                            className={({ isActive }) =>
                                `text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-100 text-indigo-800' : ''}`
                            }
                        >
                            Twitter Verification
                        </NavLink>
                        <NavLink
                            to="/report"
                            className={({ isActive }) =>
                                `text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-100 text-indigo-800' : ''}`
                            }
                        >
                            Report Account
                        </NavLink>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-100 text-indigo-800' : ''}`
                            }
                        >
                            Admin Panel
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}