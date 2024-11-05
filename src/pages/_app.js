import "@/styles/globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect, useState} from "react";
import {getGeneralSetting} from "../../lib/query";

export default function App({ Component, pageProps }) {

    return (
    <>

            <MainApp Component={Component} pageProps={pageProps} />

    </>
  );
}


const MainApp = ({ Component, pageProps }) => {
    const [general, setGeneral] = useState()
    const [footer, setFooter] = useState()
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // 'once: true' ensures animations only happen once

        (async ()=> {
            const {general, footer} = await getGeneralSetting();
            setGeneral(general)
            setFooter(footer)
        })()

    }, []);



    return (
        <>
            <Head>
                {general?.favicon?.node && (
                    <>
                        <link rel="icon" href={general?.favicon?.node?.sourceUrl} />
                        <link rel="apple-touch-icon" href={general?.favicon?.node?.sourceUrl} />
                    </>
                )}
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer footer={footer} />
        </>
    );
};
