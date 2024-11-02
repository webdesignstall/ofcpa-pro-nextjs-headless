import "@/styles/globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import 'animate.css';
import {SiteSettingProvider, useSiteSetting} from "@/context/SiteContext";
import {urlFor} from "../../lib/api";
import Head from "next/head";

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
