import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../../public/flameBitsLogo.png';
import Image from 'next/image';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="shadow-xl">
            <nav className=" flex items-center justify-between py-4 backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 w-full max-w-full rounded-none px-4 bg-white text-white border-0 sticky top-0 z-50">
                <div>
                    <Link href="/" className="flex items-center text-gray-500 font-bold text-lg">
                        <Image src={logo} loading="lazy" width={50} height={50} alt="Logo" />
                        <span className="ml-2">FlameBits</span>
                    </Link>
                </div>
                <div className="hidden lg:flex  items-center space-x-6 text-gray-400 font-medium">
                    <Link href="/" className="hover:text-gray-700">
                        Home
                    </Link>
                    <Link href="/myblogs" className="hover:text-gray-700">
                        My Blogs
                    </Link>
                    <Link href="/newblogs"
                        className="hover:text-gray-700">

                        Add Blogs
                    </Link>

                    <Link href="/login"
                        className="bg-gradient-to-r from-yellow-500 to-orange-800 transition duration-300 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-red-600 p-2 px-4 rounded-lg text-white inline-block"
                    >
                        Login
                    </Link>
                </div>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-700 text-2xl lg:hidden focus:outline-none"
                >
                    {isMenuOpen ? '✖' : '☰'}
                </button>
            </nav>
            {isMenuOpen && (
                <div className="lg:hidden flex flex-col items-center space-y-4 p-4 bg-slate-800 text-white">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/myblogs" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">
                        My Blogs
                    </Link>
                    <Link href="/newblogs" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">
                        New Blogs
                    </Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">
                        Login
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
