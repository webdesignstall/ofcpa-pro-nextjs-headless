import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {

    return (
    <Html lang="en">
      <Head />
        <body className="antialiased">
         <Main/>
         <NextScript/>
         <Script
             src="https://widgets.leadconnectorhq.com/loader.js"
             data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
             data-widget-id="66c39b25696735cbdea9505e"
             strategy="lazyOnload"
         />
        </body>

    </Html>
  );
}
