import "@/styles/globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import 'animate.css';

export default function App({ Component, pageProps }) {
    return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
