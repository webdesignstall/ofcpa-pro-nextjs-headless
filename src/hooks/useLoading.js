// hooks/useLoading.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useLoading = (watchRoutes = []) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const isWatchedRoute = (url) => {
        // Check if the URL matches any route in the watchRoutes list, even with dynamic segments
        return watchRoutes.some(route => {
            // Convert the route path to a regex pattern to handle dynamic segments
            const regex = new RegExp(`^${route.replace(/\[.*?\]/g, ".*")}$`);
            return regex.test(url);
        });
    };

    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            if (watchRoutes.length === 0 || isWatchedRoute(url)) {
                setLoading(true);
            }
        };

        const handleRouteChangeComplete = (url) => {
            if (watchRoutes.length === 0 || isWatchedRoute(url)) {
                setLoading(false);
            }
        };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [router, watchRoutes]);

    return loading;
};

export default useLoading;
