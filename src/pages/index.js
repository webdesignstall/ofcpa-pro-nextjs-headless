import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FirstSection from '../../components/section/First_Section'
import WorkingSection from '../../components/section/workingSection'

export default function Home() {
  return (
    <div>
      <div>
        <Header />
        <div className='px-6'>
          <FirstSection />
          <WorkingSection />
        </div>
        <Footer />
      </div>
    </div>
  )
}
