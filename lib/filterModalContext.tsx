import { useLocalSearchParams } from 'expo-router';
import React, { createContext, useState, useContext } from 'react';

interface FilterValues {
  priceRange: number[];
  areaRange: number[];
  bedrooms: number;
  bathrooms: number;
  selectedCategory: string;
}

interface FilterModalContextType {
  showFilterModal: boolean;
  setShowFilterModal: (show: boolean) => void;
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
  updateFilterValue?: (key: keyof FilterValues, value: any) => void;
}

const FilterModalContext = createContext<FilterModalContextType>({
  showFilterModal: false,
  setShowFilterModal: (show: boolean) => {},
  filterValues: {
    priceRange: [500, 7000],
    areaRange: [500, 5000],
    bedrooms: 5,
    bathrooms: 5,
    selectedCategory: 'All'
  },
  setFilterValues: (values: any) => {},
});

export const FilterModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const params = useLocalSearchParams<{filter?: string}>();
  const [filterValues, setFilterValues] = useState({
    priceRange: [500, 7000],
    areaRange: [300, 5000],
    bedrooms: 5,
    bathrooms: 5,
    selectedCategory: params.filter || 'All'
  });
  
  const updateFilterValue = (key: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <FilterModalContext.Provider value={{ showFilterModal, setShowFilterModal, filterValues, setFilterValues, updateFilterValue }}>
      {children}
    </FilterModalContext.Provider>
  );
};

export const useFilterModal = () => useContext(FilterModalContext);