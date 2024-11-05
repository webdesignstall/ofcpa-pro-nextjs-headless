import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const SkeletonLoader = () => {
    return (
        <div className="h-[500px] bg-gray-300 rounded animate-pulse flex justify-center"></div>
    );
};

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
        <div id="booking" ref={ref} className="min-h-[500px]">
            {!iframeLoaded ? (
                <SkeletonLoader />
            ) : (
                <iframe
                    src="https://link.conversionpro.io/widget/booking/Y8yBZ09JEkpgFA9Ymfpa"
                    className="w-full border-none overflow-hidden"
                    scrolling="no"
                    id="msgsndr-calendar"
                />
            )}
            <br />
        </div>
    );
};

export default BookingSection;
