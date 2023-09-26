import React from "react";

const CongSettingsContext = React.createContext({
    minOnShift: 2,
    setMinOnShift: () => {},
});

export const CongSettingsProvider = CongSettingsContext.Provider;

export default CongSettingsContext;
