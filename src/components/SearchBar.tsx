'use client'
import { booksResponse } from '@/types/responseType'
import { useState, useEffect } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

interface SearchBarProps {
  data: booksResponse[]
  searchKeys: (keyof booksResponse)[]
  onSearchResults: (results: booksResponse[], query: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}
const SearchBar = ({ data = [], searchKeys, onSearchResults }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!searchQuery.trim()) {
      onSearchResults([], searchQuery)
      return
    }

    const timer = setTimeout(() => {
      const results: booksResponse[] = data.filter(item =>
        searchKeys.some(key => 
          String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      onSearchResults(results, searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, data, searchKeys, onSearchResults])

  return (
    <div className="relative">
      <div className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-800">
        <FaMagnifyingGlass />
        <input 
          type="text" 
          placeholder="Search" 
          className="focus:outline-none font-mono bg-transparent w-40 md:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
      </div>

      {showResults && searchQuery && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 z-50">
          <p className="p-2 text-sm">Searching for: {searchQuery}</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar