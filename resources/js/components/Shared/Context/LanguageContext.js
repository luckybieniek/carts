import React from "react";

const LanguageContext = React.createContext({
    language: "pl",
    setLanguage: () => {},
});

export const LanguageProvider = LanguageContext.Provider;

export default LanguageContext;
