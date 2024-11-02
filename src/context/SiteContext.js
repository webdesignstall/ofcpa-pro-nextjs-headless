// context/FaviconContext.js
import { createContext, useContext, useState, useEffect } from 'react';


const SiteSettingContext = createContext();

export const SiteSettingProvider = ({ children }) => {
    const [setting, setSiteSetting] = useState('');

    useEffect(() => {
        (async ()=> {
            const response = await fetch('/api/site-setting');
            const result = await response.json();
            setSiteSetting(result)
        })()
    }, []);

    return (
        <SiteSettingContext.Provider value={setting}>
            {children}
        </SiteSettingContext.Provider>
    );
};

export const useSiteSetting = () => useContext(SiteSettingContext);
