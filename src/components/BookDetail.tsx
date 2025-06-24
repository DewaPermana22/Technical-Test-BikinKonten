'use client'
import { FetchHelper } from '@/utils/FetchHelper';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineBook } from 'react-icons/md';
import Footer from './Footer';
import { BiUserCircle } from 'react-icons/bi';
import Loading from './Loading';

const BookDetail = ({ id }: { id: string }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['book', id],
        queryFn: () => FetchHelper({ url: `https://stephen-king-api.onrender.com/api/book/${id}` }),
        select: (bookData) => bookData.data
    });

    console.log(data);
    if (isLoading) return <Loading />;
    if (error) return <p className="p-4 text-red-500">Error loading book detail.</p>;
    return (
        <div className='max-sm:px-4 max-sm:py-3'>
            <div className="flex items-center justify-center flex-col">
                <MdOutlineBook color='#155dfc' size={200} className="sm:w-48 sm:h-48 w-32 h-32" />
                <h1 className=" sm:text-3xl text-2xl text-blue-600 font-semibold text-center px-4">Book Detail</h1>
            </div>
            <div className='p-10 sm:p-10 px-4 py-6'>
                <div className='header-content mb-5'>
                    <h1 className='detail-xl text-gray-400 text-sm sm:text-base'>Book ID : {data?.id}</h1>
                    <h1 className='text-3xl sm:text-3xl font-semibold font-mono break-words'>{data?.Title}</h1>
                    <h1 className='detail-xl capitalize text-sm sm:text-base'>{data?.Pages} pages</h1>
                    <h1 className='detail-xl flex items-start sm:items-center capitalize flex-col sm:flex-row gap-2 sm:gap-0 text-sm sm:text-base'> vilains :
                        <ul className='flex sm:gap-5 gap-3 items-center flex-wrap'>
                            {data?.villains?.slice(0, 5).map((villain: { name: string }, index: number) => (
                                <li key={index} className="data-detail flex items-center text-xs sm:text-sm">
                                    <BiUserCircle size={30} className="sm:w-7 sm:h-7 w-6 h-6 flex-shrink-0" />
                                    <span className="break-words">
                                        {villain.name.slice(0, 10) + '...' || '-'}
                                    </span>
                                </li>
                            ))}

                            {data?.villains?.length > 10 && (
                                <li className="data-detail text-gray-500 italic text-xs sm:text-sm">
                                    +{data.villains.length - 5} lainnya
                                </li>
                            )}
                        </ul>
                    </h1>
                </div>
                <div className="space-y-2 sm:space-y-1">
                    <h1 className='data-detail text-sm sm:text-base break-words'>Publisher : {data?.Publisher}</h1>
                    <h1 className='data-detail text-sm sm:text-base'>Year : {data?.Year}</h1>
                    <h1 className='data-detail text-sm sm:text-base break-all'>ISBN : {data?.ISBN}</h1>
                    <div className='data-detail text-sm sm:text-base'>
                        <span>Notes :</span>
                        <div className="mt-2 sm:mt-1">
                            {data?.Notes?.map((note: string, index: number) => (
                                <div key={index} className="data-detail list-none mb-2 sm:mb-1 break-words">
                                    {note || '-'}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => window.history.back()} className="fixed cursor-pointer top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
            <Footer />
        </div>
    )
}

export default BookDetail