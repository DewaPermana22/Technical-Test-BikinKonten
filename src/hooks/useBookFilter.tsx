import { useState, useMemo, useCallback } from "react";
import { booksResponse } from "@/types/responseType";

interface UseBookFilterProps {
    data: booksResponse[],
    searchQuery: string,
    filteredBooks: booksResponse[]
}

const useBookFilter = ({ data, searchQuery, filteredBooks }: UseBookFilterProps) => {
    const [sortBy, setSortBy] = useState('');
    const [showModal, setShowModal] = useState(false);

    const sortBooks = useCallback((booksToSort: booksResponse[], sortOpt: string) => {
        if (!sortOpt) return booksToSort;

        return [...booksToSort].sort((a, b) => {
            switch (sortOpt) {
                case 'title':
                    return a.Title.localeCompare(b.Title);
                case 'publisher':
                    return a.Publisher.localeCompare(b.Publisher);
                case 'year':
                    return (Number(a.Year) || 0) - (Number(b.Year) || 0);
                case 'pages':
                    return (Number(a.Pages) || 0) - (Number(b.Pages) || 0);
                default:
                    return 0;
            }
        });
    }, []);

    const sortedBooks = useMemo(() => {
        const dataToSort = searchQuery && filteredBooks.length > 0 ? filteredBooks : data;
        return sortBooks(dataToSort, sortBy);
    }, [data, filteredBooks, searchQuery, sortBy, sortBooks]);

    const handleApplyFilter = useCallback((selectedOption: string) => {
        setSortBy(selectedOption);
        setShowModal(false);
    }, []);

    const handleOpenModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const resetSort = useCallback(() => {
        setSortBy('');
    }, []);

    return {
        sortedBooks,
        sortBy,
        showModal,
        handleApplyFilter,
        handleOpenModal,
        handleCloseModal,
        resetSort,
        isSorted: !!sortBy
    }
}

export default useBookFilter