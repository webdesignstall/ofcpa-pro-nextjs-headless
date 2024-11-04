import React from 'react'
import ComparisonCard from '../../components/comparison/Card'
import {getComparison, getHomePageContent} from "../../lib/query";
import {revalidateIntervalDay} from "@/lib/utils";


export async function getStaticProps() {

  const comparison = await getComparison()

/*  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}`)
  const seo = await response.json();*/

  return {
    props: {  comparison },
    revalidate: revalidateIntervalDay(1)
  };
}

export default function ComparisonTable({comparison}) {


  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      <div className='max-w-7xl mx-auto pb-6'>
        {/* Header Section */}
        <div className='flex flex-col items-center text-center mb-6'>
          <h1 className='text-3xl sm:text-4xl font-semibold tracking-tighter font-roboto text-sky-800'>
            {comparison?.sectionTitle}:
          </h1>
          <p className=' text-lg sm:text-xl text-gray-600'>
            {comparison?.sectionSubtitle}:
          </p>
        </div>

        {/* Comparison Boxes */}
        <div className='flex flex-col sm:flex-row justify-center items-center lg:justify-end gap-6 sm:gap-4 mt-1'>
          <div className='bg-yellow-400 text-white px-6 sm:px-16 py-4 sm:py-3 h-auto sm:h-16 flex justify-center items-center flex-col rounded-md w-full sm:w-auto'> 
            <h2 className='text-lg sm:text-xl font-semibold'>{comparison?.ourColumnTitle}</h2>
            <p className='text-sm sm:text-base text-sky-800 mt-1 sm:mt-0'>
              {comparison?.ourColumnSubtitle}
            </p>
          </div>
          <div className='bg-sky-800 text-white px-6 sm:px-16 py-4 sm:py-3 h-auto sm:h-16 flex justify-center items-center flex-col rounded-md w-full sm:w-auto'>
            <h2 className='text-lg sm:text-xl font-semibold'>{comparison?.otherColumnTitle}</h2>
          </div>
        </div>
      </div>

      {/* Comparison Card */}
      <div className='mt-8'>
        <ComparisonCard tables={comparison?.tables} />
      </div>
    </div>
  )
}
