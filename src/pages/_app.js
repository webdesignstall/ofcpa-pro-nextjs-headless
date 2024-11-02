import "@/styles/globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import {SiteSettingProvider, useSiteSetting} from "@/context/SiteContext";
import {urlFor} from "../../lib/api";
import Head from "next/head";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";
export default function App({ Component, pageProps }) {

    return (
    <>
        <SiteSettingProvider>
            <MainApp Component={Component} pageProps={pageProps} />
        </SiteSettingProvider>
    </>
  );
}


const MainApp = ({ Component, pageProps }) => {
    const setting = useSiteSetting();
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // 'once: true' ensures animations only happen once
    }, []);

    return (
        <>
            <Head>
                {setting?.favicon && (
                    <>
                        <link rel="icon" href={urlFor(setting.favicon)?.url()} />
                        <link rel="apple-touch-icon" href={urlFor(setting.favicon)?.url()} />
                    </>
                )}
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
};
