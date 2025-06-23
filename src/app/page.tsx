'use client'
import { useQuery } from '@tanstack/react-query';
import Navbar from "@/components/Navbar";
import { booksResponse } from '@/types/responseType';
import { FetchHelper } from '@/utils/FetchHelper';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: () => FetchHelper({url: 'https://stephen-king-api.onrender.com/api/books'}),
    select: (booksData) => booksData.data
  });

  return (
    <>
      <Navbar />
      <h1>Hello world</h1>
      {data?.map((book: booksResponse) => (
        <div key={book.id}>
          <h2>{book.Title}</h2>
          <p>{book.Publisher}</p>
        </div>
      ))}
    </>
  );
}
