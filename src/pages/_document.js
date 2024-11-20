import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import {useEffect} from "react";
import Image from "next/image";

export default function Document() {

    useEffect(() => {
        // This will track page views after the component mounts
        window.fbq && window.fbq('track', 'PageView');
    }, []);

    return (
    <Html lang="en">
        <Head >

            <Script
                src="https://widgets.leadconnectorhq.com/loader.js"
                data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
                data-widget-id="66c39b25696735cbdea9505e"
                strategy="afterInteractive" // or "lazyOnload" if you want to load it after the page is fully loaded
            />

            <Script
                    id="facebook-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '535084009066260');
                        fbq('track', 'PageView');
                    `,
                    }}
                />

        </Head>
        <body className="antialiased">
        <noscript>
            <img
                height="1"
                width="1"
                style={{display: 'none'}}
                src="https://www.facebook.com/tr?id=535084009066260&ev=PageView&noscript=1"
                alt="pixel"
            />
        </noscript>
        <Main/>
        <NextScript/>
        </body>

    </Html>
    );
}
