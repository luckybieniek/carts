import React from "react";

const LoggedUserContext = React.createContext({});

export const LoggedUserProvider = LoggedUserContext.Provider;

export default LoggedUserContext;
