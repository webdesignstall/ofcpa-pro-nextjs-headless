import React from 'react'
import ComparisonCard from '../../components/comparison/Card'

export default function ComparisonTable() {
  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      <div className='max-w-7xl mx-auto pb-6'>
        {/* Header Section */}
        <div className='flex flex-col items-center text-center mb-6'>
          <h1 className='text-3xl sm:text-4xl font-semibold tracking-tighter font-roboto text-sky-800'>
            WHY I'M YOUR BEST CHOICE:
          </h1>
          <p className=' text-lg sm:text-xl text-gray-600'>
            A COMPREHENSIVE COMPARISON
          </p>
        </div>

        {/* Comparison Boxes */}
        <div className='flex flex-col sm:flex-row justify-center items-center lg:justify-end gap-6 sm:gap-4 mt-1'>
          <div className='bg-yellow-400 text-white px-6 sm:px-16 py-4 sm:py-3 h-auto sm:h-16 flex justify-center items-center flex-col rounded-md w-full sm:w-auto'> 
            <h2 className='text-lg sm:text-xl font-semibold'>THE ONLYFANS ACCOUNTANT</h2>
            <p className='text-sm sm:text-base text-sky-800 mt-1 sm:mt-0'>
              Financial Solutions for the Modern Creator
            </p>
          </div>
          <div className='bg-sky-800 text-white px-6 sm:px-16 py-4 sm:py-3 h-auto sm:h-16 flex justify-center items-center flex-col rounded-md w-full sm:w-auto'>
            <h2 className='text-lg sm:text-xl font-semibold'>OTHER COMPETITORS</h2>
          </div>
        </div>
      </div>

      {/* Comparison Card */}
      <div className='mt-8'>
        <ComparisonCard />
      </div>
    </div>
  )
}
