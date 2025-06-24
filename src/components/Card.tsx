import { booksResponse } from '@/types/responseType'
import { useRouter } from 'next/navigation'

interface CardProps {
  data: booksResponse
}

const Card = ({ data }: CardProps) => {
  const router = useRouter();

  const navigateToDetail = () => {
    router.push(`/book/${data.id}`);
  }

  return (
    <div className='bg-gray-100 flex flex-col justify-between border-gray-300 h-48 w-full dark:border-neutral-800 border dark:bg-neutral-900 rounded-lg p-4'>
      <div className="content-top">
        <h1 className='text-xl font-mono font-bold text-neutral-900 dark:text-gray-50'>{data.Title}</h1>
        <div className="flex gap-5 mt-2 items-center">
          <p className='text-sm text-gray-500'> Publisher : {data.Publisher.slice(0, 16) + '...'}</p>
          <p className='text-sm text-gray-500'> Year : {data.Year}</p>
        </div>
      </div>

      <div className="content-bottom">
        <div className='flex justify-between items-center'>
          <p className='text-sm text-gray-400'>{data.Pages} Pages</p>
          <button onClick={navigateToDetail} className=' w-20 p-1 detail-button text-sm rounded-sm font-semibold cursor-pointer'>Detail</button>
        </div>
      </div>
    </div>
  )
}

export default Card