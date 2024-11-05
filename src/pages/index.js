import FirstSection from '../../components/section/First_Section'
import WorkingSection from '../../components/section/workingSection'
import RatingSection from '../../components/section/RatingSection'
import PackageSection from '../../components/section/PackageSection'
import ServiceSection from '../../components/section/ServiceSection'
import ScheduleSection from '../../components/section/ScheduleSection'

import {revalidateIntervalDay} from "@/lib/utils";
import Head from "next/head";
import parse from "html-react-parser";
import {getHomePageContent} from "../../lib/query";

export async function getStaticProps() {

    const pageContent = await getHomePageContent()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}`)

    const result = await response.json();

  return {
    props: {  seo: result, pageContent: pageContent },
    revalidate: revalidateIntervalDay(1)
  };
}

export default function Home({ pageContent, seo }) {

    return (
    <>
        <Head>
            {parse(seo.head)}
        </Head>
        <div className='p-4 lg:p-10'>
          <FirstSection heroSection={pageContent?.heroSection} />
          <WorkingSection workingWithUs={pageContent?.workingWithUs} />
          <RatingSection reviews={pageContent?.reviews} />
          <PackageSection packages={pageContent?.pricingPlan} />
          <ServiceSection services={pageContent?.services} />
          <ScheduleSection />
        </div>
      </>
  )
}


