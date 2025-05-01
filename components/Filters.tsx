import { Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { categories } from '@/constants/data';
import { useFilterModal } from '@/lib/filterModalContext';

interface FiltersProps {
  wrapMode?: boolean;
}

const Filters = ({ wrapMode = false }: FiltersProps) => {
  const { filterValues, setFilterValues } = useFilterModal();
  const selectedCategory = filterValues.selectedCategory;

  const handleCategoryPress = (category: string) => {
    const newCategory = selectedCategory === category ? 'All' : category;
    
    router.setParams({ filter: newCategory });
    setFilterValues({
      ...filterValues,
      selectedCategory: newCategory
    });
    
  }

  const renderCategory = (item: typeof categories[0], index: number) => (
    <TouchableOpacity 
      onPress={() => handleCategoryPress(item.category)} 
      className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full mb-2 ${selectedCategory === item.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}`} 
      key={index}
    >
      <Text 
        className={`text-sm ${selectedCategory === item.category ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'}`}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (!wrapMode) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
        {categories.map((item, index) => renderCategory(item, index))}
      </ScrollView>
    );
  }
  
  return (
    <View className='mt-3 mb-2 flex flex-row flex-wrap'>
      {categories.map((item, index) => renderCategory(item, index))}
    </View>
  );
}

export default Filters