import React from 'react'
import ComparisonCard from '../../components/comparison/Card'
import {getComparison} from "../../lib/query";
import {revalidateIntervalDay} from "@/lib/utils";
import Head from "next/head";
import parse from "html-react-parser";


export async function getStaticProps() {

  const comparison = await getComparison()

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/comparison`)
  const seo = await response.json();

  return {
    props: {  comparison, seo },
    revalidate: revalidateIntervalDay(1)
  };
}

export default function ComparisonTable({comparison, seo}) {


  return (

      <>
        {
          seo?.head &&  <Head>
              {parse(seo?.head)}
            </Head>
        }


        <div className="my-8 px-4 sm:px-6 lg:px-8">
          <div className='max-w-7xl mx-auto '>
            {/* Header Section */}
            <div className='flex flex-col items-center mb-6 lg:ml-8'>
              <div>
                <h1 className='text-2xl sm:text-4xl font-semibold tracking-tighter font-roboto text-sky-800'>
                  {comparison?.sectionTitle}
                </h1>
                <h2 className='text-lg sm:text-2xl text-sky-800'>
                  {comparison?.sectionSubtitle}
                </h2>
              </div>

            </div>

            {/* Comparison Boxes */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 lg:mr-8'>
              <div></div>
              <div
                  className='bg-yellow-400 text-white lg:px-16 p-2 lg:py-3 h-auto lg:h-16 flex justify-center items-center flex-col rounded-md w-full sm:w-auto'>
                <h2 className='text-lg lg:text-xl font-semibold'>{comparison?.ourColumnTitle}</h2>
                <p className='text-sm sm:text-base text-sky-800 mt-1 sm:mt-0'>
                  {comparison?.ourColumnSubtitle}
                </p>
              </div>
              <div className='bg-sky-800 text-white lg:px-16 py-4 sm:py-3 h-auto lg:h-16 flex justify-center items-center flex-col rounded-md w-full sm:w-auto'>
                <h2 className='text-lg text-yellow-400 sm:text-xl font-semibold'>{comparison?.otherColumnTitle}</h2>
              </div>
            </div>
          </div>

          {/* Comparison Card */}
          <div className=''>
            <ComparisonCard tables={comparison?.tables}/>
          </div>
        </div>
      </>


)
}
