import BookDetail from '@/components/BookDetail'
const page = ({ params }: { params: { id: string } }) => {
  return <BookDetail id={params.id} />
}

export default page