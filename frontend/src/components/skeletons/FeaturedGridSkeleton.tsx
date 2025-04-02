import React from 'react'

const FeaturedGridSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
        {
            Array.from({length: 6}).map((_, index) => (
                <div key={index} className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden animate-pulse'>
                    <div className='w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0'></div>
                    <div className='flex-1 p-4'>
                        <div className='h-4 bg-zinc-700 rounded w-3/4 mb-2'></div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default FeaturedGridSkeleton