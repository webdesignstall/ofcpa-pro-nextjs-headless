import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FirstSection from '../../components/section/First_Section'
import WorkingSection from '../../components/section/workingSection'
import RatingSection from '../../components/section/RatingSection'
import PackageSection from '../../components/section/PackageSection'
import ServiceSection from '../../components/section/ServiceSection'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>OF Accountant - Accounting and Taxes for OnlyFans Creators</title>
      </Head>
      <div>
        <Header />
        <div className='px-10'>
          <FirstSection />
          <WorkingSection />
          <RatingSection />
          <PackageSection />
          <ServiceSection />
        </div>
        <Footer />
      </div>
    </div>
  )
}
