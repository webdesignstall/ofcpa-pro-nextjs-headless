import FirstSection from '../../components/section/First_Section'
import WorkingSection from '../../components/section/workingSection'
import RatingSection from '../../components/section/RatingSection'
import PackageSection from '../../components/section/PackageSection'
import ServiceSection from '../../components/section/ServiceSection'
import ScheduleSection from '../../components/section/ScheduleSection'

import {
    getHeroSection,
    getPackages, getPageSeo,
    getReviews,
    getTaxCorporateServices,
    getWorkingWithUs
} from "../../lib/api";
import CustomNextSeo from "../../components/CustomNextSeo";

export async function getServerSideProps() {
  const heroSection = await getHeroSection();
  const workingWithUs = await getWorkingWithUs();
  const reviews = await getReviews();
  const taxCorporateServices = await getTaxCorporateServices();
  const packages = await getPackages();
  const seo = await getPageSeo('Home');

  return {
    props: { taxCorporateServices, packages, heroSection, workingWithUs, reviews, seo },
  };
}

export default function Home({ heroSection, workingWithUs, reviews, packages, taxCorporateServices, seo }) {

  return (
    <>
        <CustomNextSeo seo={seo} slug='/' />
      <>
        <div className='p-4 lg:p-10'>
          <FirstSection heroSection={heroSection} />
          <WorkingSection workingWithUs={workingWithUs} />
          <RatingSection reviews={reviews} />
          <PackageSection packages={packages} />
          <ServiceSection services={taxCorporateServices} />
          <ScheduleSection />
        </div>
      </>
    </>
  )
}


