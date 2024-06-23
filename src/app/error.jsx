'use client' // Error components must be Client Components
 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
 
export default function Error({ error, reset }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex justify-center p-24 flex-col'>
      <div className="flex justify-center">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset();
            router.push('/');
          }
        }
      >
        Try again got to home
      </button>
      </div>
    </div>
  )
}