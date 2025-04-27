import React, { createContext, useState, useContext } from 'react';

const FilterModalContext = createContext({
  showFilterModal: false,
  setShowFilterModal: (show: boolean) => {},
});

export const FilterModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  return (
    <FilterModalContext.Provider value={{ showFilterModal, setShowFilterModal }}>
      {children}
    </FilterModalContext.Provider>
  );
};

export const useFilterModal = () => useContext(FilterModalContext);