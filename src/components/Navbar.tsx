'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <header className="bg-background border-b border-gray-200 dark:border-gray-800">
            <nav className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-lg font-bold text-amber-5 dark:text-red-5">
                    Ini Logo
                </h1>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-800">
                        <FaMagnifyingGlass />
                        <input type="text" placeholder='Search' className="focus:outline-none" />
                    </div>

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {mounted ? (
                            theme === 'dark' ? <SunIcon /> : <MoonIcon />
                        ) : (
                            <div className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar