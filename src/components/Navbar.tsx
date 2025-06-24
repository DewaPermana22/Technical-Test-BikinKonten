'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { booksResponse } from '@/types/responseType'
import { CiFilter } from 'react-icons/ci'
import SearchBar from './SearchBar'

interface NavbarProps {
    searchData?: booksResponse[]
    onSearchResults: (results: booksResponse[], query: string) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
    onOpenFilter: () => void
    isSorted?: boolean
    sortBy?: string
}

const Navbar = ({ 
    searchData, 
    onSearchResults = () => { }, 
    searchQuery, 
    setSearchQuery,
    onOpenFilter,
    isSorted = false,
    sortBy = ''
}: NavbarProps) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const controlNavbar = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false)
            } else {
                setShowNavbar(true)
            }
            setLastScrollY(window.scrollY)
        }
    }

    useEffect(() => {
        setMounted(true)
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar)
            return () => {
                window.removeEventListener("scroll", controlNavbar)
            }
        }
    }, [lastScrollY])

    const getSortLabel = (sortOption: string) => {
        const labels: Record<string, string> = {
            'title': 'Title',
            'publisher': 'Publisher', 
            'year': 'Year',
            'pages': 'Pages'
        };
        return labels[sortOption] || sortOption;
    };

    return (
        <header className={`bg-background fixed top-0 right-0 left-0 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-800 transition-transform duration-300 z-50
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-lg flex items-center gap-2 font-mono font-bold text-blue-600">
                    <span className='hidden sm:block'>Ini</span> Logo
                </h1>
                <div className="flex items-center gap-6">
                    {searchData && (
                        <SearchBar
                            data={searchData}
                            searchKeys={['Title', 'Publisher', 'ISBN']}
                            onSearchResults={onSearchResults}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    )}
                    <button 
                        onClick={onOpenFilter} 
                        title={isSorted ? `Sorted by ${getSortLabel(sortBy)}` : 'Sort '} 
                        className={`flex font-mono font-medium items-center cursor-pointer p-2 rounded-sm transition-colors ${
                            isSorted 
                                ? 'bg-green-600 text-white' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        <CiFilter className={isSorted ? 'text-green-100' : ''} /> 
                        <span className='max-sm:hidden'>{isSorted ? `Sort: ${getSortLabel(sortBy)}` : 'Sort'}</span>
                    </button>
                    
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Toggle theme"
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