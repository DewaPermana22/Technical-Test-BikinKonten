'use client'
import { useQuery } from '@tanstack/react-query'
import Navbar from "@/components/Navbar"
import { FetchHelper } from '@/utils/FetchHelper'
import Card from '@/components/Card'
import { useState, useEffect } from 'react'
import { booksResponse } from '@/types/responseType'
import Footer from '@/components/Footer'
import FilterModal from '@/components/modal/FilterModal'
import useBookFilter from '@/hooks/useBookFilter'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filteredBooks, setFilteredBooks] = useState<booksResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearchResults, setHasSearchResults] = useState(true);

  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: () => FetchHelper({ url: 'https://stephen-king-api.onrender.com/api/books' }),
    select: (booksData) => booksData.data,
  })

  const {
    sortedBooks,
    showModal,
    handleApplyFilter,
    handleOpenModal,
    handleCloseModal,
    sortBy,
    isSorted,
    resetSort
  } = useBookFilter({
    data: data || [],
    searchQuery,
    filteredBooks
  });

  useEffect(() => {
    if (data) {
      setFilteredBooks(data)
    }
  }, [data])

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  const handleSearchResults = (results: booksResponse[], query: string) => {
    setSearchQuery(query);
    const hasResults = results.length > 0 || query === '';
    setFilteredBooks(results.length > 0 ? results : data || []);
    setHasSearchResults(hasResults);
    setCurrentPage(1);
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = sortedBooks?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

  return (
    <>
      <Navbar
        searchData={data}
        onSearchResults={handleSearchResults}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenFilter={handleOpenModal}
        isSorted={isSorted}
        sortBy={sortBy}
      />
      
      <div className="flex min-h-screen p-7 mt-20 justify-center">
        {!hasSearchResults && searchQuery ? (
          <div className="absolute top-24 left-0 right-0 flex justify-center">
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg shadow-lg">
              No results found for "{searchQuery}"
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {currentBooks?.map((book: booksResponse) => (
              <Card data={book} key={book.id} />
            ))}
          </div>
        )}
      </div>

      {hasSearchResults && totalPages > 1 && (
        <div className="flex justify-center my-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded font-mono disabled:opacity-50">
            Prev
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded font-mono disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <FilterModal 
        isOpen={showModal}
        onReset={resetSort}
        onClose={handleCloseModal}
        onApply={handleApplyFilter}
      />
      <Footer/>
    </>
  )
}