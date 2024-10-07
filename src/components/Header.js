import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-transparent text-white shadow-lg backdrop-blur-md fixed w-full">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-300 transition-colors">
                        User Management
                    </Link>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-300 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/vikash-verma-a40a8a233" className="hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">
                                Connect Me
                            </a>

                        </li>
                        <li>
                            <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                API Docs
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
