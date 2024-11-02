/*

const CalendlyEmbed = () => {
  return (
      <>
          <div id="booking">
              <iframe src="https://link.conversionpro.io/widget/booking/Y8yBZ09JEkpgFA9Ymfpa"
                      style={{width: '100%', border: 'none', overflow: 'hidden'}}  scrolling="no" id="msgsndr-calendar"></iframe>
              <br/>
              <script src="https://link.conversionpro.io/js/embed.js" type="text/javascript"></script>
          </div>

      </>

  )
      ;
};

export default CalendlyEmbed;
*/

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const BookingSection = () => {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        if (inView && !iframeLoaded) {
            setIframeLoaded(true);

            // Load the external script dynamically
            const script = document.createElement('script');
            script.src = "https://link.conversionpro.io/js/embed.js";
            script.async = true;
            document.body.appendChild(script);

            // Cleanup: Remove script when component unmounts or iframe is removed
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [inView, iframeLoaded]);

    return (
        <div id="booking" ref={ref} style={{ minHeight: '500px' }}>
            {iframeLoaded && (
                <>
                    <iframe
                        src="https://link.conversionpro.io/widget/booking/Y8yBZ09JEkpgFA9Ymfpa"
                        style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        id="msgsndr-calendar"
                    />
                    <br />
                </>
            )}
        </div>
    );
};

export default BookingSection;
