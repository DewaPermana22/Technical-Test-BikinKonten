import { booksResponse } from '@/types/responseType'
import React from 'react'

interface CardProps {
    data : booksResponse
}

const Card = ( {data} : CardProps) => {
  return (
    <div className='bg-gray-100 border-gray-300 h-48 w-full dark:border-neutral-800 border dark:bg-neutral-900 rounded-lg p-4'>
        <h1 className='text-xl font-bold text-neutral-900 dark:text-gray-50'>{data.Title}</h1>
        <p className='text-sm text-gray-500'>{data.Publisher}</p>
    </div>
  )
}

export default Card