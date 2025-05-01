import icons from '@/constants/icons'
import { useFilterModal } from '@/lib/filterModalContext';
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import images from '@/constants/images';
import Filters from './Filters';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function FilterModal() {
const { setShowFilterModal, filterValues, setFilterValues, showFilterModal } = useFilterModal();
const handleShowFilters = () => {
  translateY.value = withTiming(SCREEN_HEIGHT, { duration: 400 }, () => {
    runOnJS(setShowFilterModal)(false);
  });
  setShowFilterModal(false);
}

const translateY = useSharedValue(SCREEN_HEIGHT);

const [priceRange, setPriceRange] = useState(filterValues.priceRange);
const [areaRange, setAreaRange] = useState(filterValues.areaRange);
const [bedrooms, setBedrooms] = useState(filterValues.bedrooms);
const [bathrooms, setBathrooms] = useState(filterValues.bathrooms);

const modalStyle = useAnimatedStyle(() => {
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: '#e6eaf2',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 24,
    zIndex: 1000,
    elevation: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    transform: [{ translateY: translateY.value }],
  };
});

useEffect(() => {
  if (showFilterModal) {
    translateY.value = withTiming(0, { duration: 400 });
  } else {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 400 });
  }
}, [showFilterModal]);

const handleBedroomAddCount = () => {
    setBedrooms(bedrooms + 1);
    
    if (bedrooms >= 5) {
        setBedrooms(5);
    }
}

const handleBedroomSubCount = () => {
    setBedrooms(bedrooms - 1);
    
    if (bedrooms <= 0) {
        setBedrooms(0);
    }
}

const handleBathroomAddCount = () => {
    setBathrooms(bathrooms + 1);

    if (bathrooms >= 5) {
        setBathrooms(5);
    }
}

const handleBathroomSubCount = () => {
    setBathrooms(bathrooms - 1);
    
    if (bathrooms <= 0) {
        setBathrooms(0);
    }
}

const handleReset = () => {
  const defaultPriceRange = [500, 7000];
  const defaultAreaRange = [300, 5000];
  const defaultBedrooms = 5;
  const defaultBathrooms = 5;
  const defaultCategory = 'All';
  
  setPriceRange(defaultPriceRange);
  setAreaRange(defaultAreaRange);
  setBedrooms(defaultBedrooms);
  setBathrooms(defaultBathrooms);
  
  setFilterValues({
    ...filterValues,
    priceRange: defaultPriceRange,
    areaRange: defaultAreaRange,
    bedrooms: defaultBedrooms,
    bathrooms: defaultBathrooms,
    selectedCategory: defaultCategory,
  });
}

const PriceLabel = ({ oneMarkerValue, twoMarkerValue, oneMarkerLeftPosition, twoMarkerLeftPosition }: { oneMarkerValue: string | number; twoMarkerValue: string | number; oneMarkerLeftPosition: number; twoMarkerLeftPosition: number }) => {
  const distance = Math.abs(oneMarkerLeftPosition - twoMarkerLeftPosition);
  const overlapThreshold = 70;
  const mightOverlap = distance < overlapThreshold;  
  
  return (
      <View style={{
        position: 'relative',
        height: 30,
        width: '100%',
      }}>
        <View style={{
          position: 'absolute',
          left: oneMarkerLeftPosition - 15,
          top: 70,
        }}>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Rubik-Medium',
            color: '#0066FF',
          }}>
            ${Number(oneMarkerValue)}
          </Text>
        </View>
        
        <View style={{
          position: 'absolute',
          left: twoMarkerLeftPosition - 15,
          top: mightOverlap ? 20 : 70,
        }}>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Rubik-Medium',
            color: '#0066FF',
          }}>
            ${Number(twoMarkerValue)}
          </Text>
        </View>
      </View>
    );
  };

  const AreaLabel = ({ oneMarkerValue, twoMarkerValue, oneMarkerLeftPosition, twoMarkerLeftPosition }: { oneMarkerValue: string | number; twoMarkerValue: string | number; oneMarkerLeftPosition: number; twoMarkerLeftPosition: number }) => {
    const distance = Math.abs(oneMarkerLeftPosition - twoMarkerLeftPosition);
    const overlapThreshold = 70;
    const mightOverlap = distance < overlapThreshold;  

    return (
      <View style={{
        position: 'relative',
        height: 30,
        width: '100%',
      }}>
        <View style={{
          position: 'absolute',
          left: oneMarkerLeftPosition - 15,
          top: 70,
        }}>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Rubik-Medium',
            color: '#0066FF',
          }}>
            {Number(oneMarkerValue)} sft
          </Text>
        </View>
        
        <View style={{
          position: 'absolute',
          left: twoMarkerLeftPosition - 15,
          top: mightOverlap ? 20 : 70,
        }}>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Rubik-Medium',
            color: '#0066FF',
          }}>
            {Number(twoMarkerValue)} sft
          </Text>
        </View>
      </View>
    );
  };
  
    const handleFilterPress = () => {
      setFilterValues({
        ...filterValues,
        priceRange,
        areaRange,
        bedrooms,
        bathrooms
      });
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 400 }, () => {
        runOnJS(setShowFilterModal)(false);
      });
      setShowFilterModal(false);
    }

  return (
    <Animated.View style={modalStyle}>
        <View className="flex flex-row items-center justify-between">
            <TouchableOpacity onPress={handleShowFilters} className="flex flex-row bg-primary-200 rounded-full size-10 items-center justify-center">
            <Image 
                source={icons.backArrow}
                className="size-5"
            />
            </TouchableOpacity>
            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Filters</Text>
            <TouchableOpacity onPress={handleReset}>
                <Text className="text-base mr-2 text-center font-rubik-medium text-primary-300">Reset</Text>
            </TouchableOpacity>
        </View>

        <View className='flex flex-col mt-8'>
            <Text className="text-base font-rubik-bold text-black-300">Price Range</Text>
            <View className='mb-3'>
              <View style={{
                position: 'absolute',
                top: 15,
                left: 0,
                right: 0,
                zIndex: 5,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image 
                  source={images.barChart} 
                  resizeMode='contain'
                  style={{
                    marginLeft: -10,
                    width: 320,
                    height: 50,
                  }}
                />
              </View>
                <MultiSlider
                    values={[priceRange[0], priceRange[1]]}
                    sliderLength={320}
                    onValuesChange={setPriceRange}
                    min={500}
                    max={7000}
                    step={100}
                    selectedStyle={{ backgroundColor: '#3b82f6', height: 4 }} 
                    trackStyle={{ height: 0 }} 
                    markerStyle={{
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: '#3b82f6', 
                        height: 24,
                        width: 24,
                    }}
                    enabledOne={true}
                    enabledTwo={true}
                    containerStyle={{
                        height: 50,
                        padding: 10,
                    }}
                    enableLabel
                    customLabel={PriceLabel}
                />
            </View>
        </View>

        <View className='flex flex-col mt-8'>
            <Text className="text-base font-rubik-bold text-black-300">Property Type</Text>
            <Filters wrapMode={true} />
        </View>

        <View className='flex flex-col mt-8'>
            <Text className="text-base font-rubik-bold text-black-300">Home Details</Text>
            <View className='mb-3 mt-3'>
                <View className="flex flex-row items-center justify-between">
                    <Text className='text-md font-rubik-bold text-black-200'>Bedrooms</Text>
                    <View className='flex flex-row items-center justify-between'>
                        <TouchableOpacity className='flex flex-row items-center justify-center bg-primary-200 rounded-full size-8' onPress={handleBedroomAddCount}>
                            <Text className='font-rubik-bold text-primary-300'>+</Text>
                        </TouchableOpacity>
                        <Text className='text-sm font-rubik-medium text-black px-3'>{bedrooms}</Text>
                        <TouchableOpacity className='flex flex-row items-center justify-center bg-primary-200 rounded-full size-8' onPress={handleBedroomSubCount}>
                            <Text className='font-rubik-bold text-primary-300'>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex flex-row items-center justify-between border-t border-primary-200 pt-3 mt-3">
                    <Text className='text-md font-rubik-bold text-black-200'>Bathrooms</Text>
                    <View className='flex flex-row items-center justify-between'>
                        <TouchableOpacity className='flex flex-row items-center justify-center bg-primary-200 rounded-full size-8' onPress={handleBathroomAddCount}>
                            <Text className='font-rubik-bold text-primary-300'>+</Text>
                        </TouchableOpacity>
                        <Text className='text-sm font-rubik-medium text-black px-3'>{bathrooms}</Text>
                        <TouchableOpacity className='flex flex-row items-center justify-center bg-primary-200 rounded-full size-8' onPress={handleBathroomSubCount}>
                            <Text className='font-rubik-bold text-primary-300'>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

        <View className='flex flex-col mt-8'>
            <Text className="text-base font-rubik-bold text-black-300">Building Size</Text>
            <View className='mb-3 mt-[-20px]'>
                <MultiSlider
                    values={[areaRange[0], areaRange[1]]}
                    sliderLength={320}
                    onValuesChange={setAreaRange}
                    min={300}
                    max={5000}
                    step={100}
                    selectedStyle={{ backgroundColor: '#3b82f6', height: 4 }} 
                    trackStyle={{ backgroundColor: '#e6eaf2', height: 4 }} 
                    markerStyle={{
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: '#3b82f6', 
                        height: 24,
                        width: 24,
                    }}
                    enabledOne={true}
                    enabledTwo={true}
                    containerStyle={{
                        height: 50,
                        padding: 10,
                    }}
                    enableLabel
                    customLabel={AreaLabel}
                />
            </View>
        </View>

        <TouchableOpacity onPress={handleFilterPress} className='flex-1 flex flex-row items-center justify-center bg-primary-300 shadow-md shadow-zinc-400 py-3 rounded-full mt-8 mb-5'>
            <Text className='text-white text-lg text-center font-rubik-bold'>Set Filter</Text>
        </TouchableOpacity>

    </Animated.View>
  )
}

export default FilterModal