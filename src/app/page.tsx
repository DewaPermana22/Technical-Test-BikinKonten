'use client'
import { useQuery } from '@tanstack/react-query';
import Navbar from "@/components/Navbar";
import { booksResponse } from '@/types/responseType';
import { FetchHelper } from '@/utils/FetchHelper';
import Card from '@/components/Card';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: () => FetchHelper({url: 'https://stephen-king-api.onrender.com/api/books'}),
    select: (booksData) => booksData.data
  });

  return (
    <>
  <Navbar />
  <div className="flex h-screen p-7 justify-center">
  <div className="grid grid-cols-4 gap-4 w-full">
    {data?.map((book: booksResponse) => (
      <Card data={book} key={book.id} />
    ))}
  </div>
  </div>
</>
  );
}
