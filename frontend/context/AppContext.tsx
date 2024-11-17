import React, { createContext, useState } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [biomarkersData, setBiomarkersData] = useState([]);

  return (
    <AppContext.Provider value={{ biomarkersData, setBiomarkersData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
