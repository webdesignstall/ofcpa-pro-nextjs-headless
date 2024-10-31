import FirstSection from '../../components/section/First_Section'
import WorkingSection from '../../components/section/workingSection'
import RatingSection from '../../components/section/RatingSection'
import PackageSection from '../../components/section/PackageSection'
import ServiceSection from '../../components/section/ServiceSection'
import Head from 'next/head'
import ScheduleSection from '../../components/section/ScheduleSection'
import LiveChat from '../../components/chat'

import {getHeroSection, getPackages, getReviews, getTaxCorporateServices, getWorkingWithUs} from "../../lib/api";

export async function getStaticProps() {
  const heroSection = await getHeroSection();
  const workingWithUs = await getWorkingWithUs();
  const reviews = await getReviews();
  const taxCorporateServices = await getTaxCorporateServices();
  const packages = await getPackages();

  return {
    props: { taxCorporateServices, packages, heroSection, workingWithUs, reviews },
  };
}

export default function Home({ heroSection, workingWithUs, reviews,  packages, taxCorporateServices}) {
  return (
    <div>
      <Head>
        <title>OF Accountant - Accounting and Taxes for OnlyFans Creators</title>
      </Head>
      <div>
        {/* <div>
          <LiveChat />
        </div> */}
        <div className='lg:px-6 px-1'>
          <FirstSection heroSection={heroSection} />
          <WorkingSection workingWithUs={workingWithUs} />
          <RatingSection reviews={reviews} />
          <PackageSection packages={packages} />
          <ServiceSection services={taxCorporateServices} />
          <ScheduleSection />
        </div>
      </div>
    </div>
  )
}


