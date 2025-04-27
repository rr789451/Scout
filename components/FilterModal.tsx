import icons from '@/constants/icons'
import { useFilterModal } from '@/lib/filterModalContext';
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import images from '@/constants/images';
import NewFilters from './NewFilters';

function FilterModal() {
const { setShowFilterModal } = useFilterModal();
const handleShowFilters = () => setShowFilterModal(false);

const [priceRange, setPriceRange] = useState([500, 5000]);
const [areaRange, setAreaRange] = useState([500, 3000]);
const [bedrooms, setBedrooms] = useState(2);
const [bathrooms, setBathrooms] = useState(1);

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
    setPriceRange([1000, 2000]);
    setAreaRange([1000, 1500]);
    setBedrooms(2);
    setBathrooms(1);
}

const PriceLabel = ({ oneMarkerValue, twoMarkerValue, oneMarkerLeftPosition, twoMarkerLeftPosition }: { oneMarkerValue: string | number; twoMarkerValue: string | number; oneMarkerLeftPosition: number; twoMarkerLeftPosition: number }) => {
    return (
      <View style={{
        position: 'relative',
        height: 30,
        width: '100%',
      }}>
        <View style={{
          position: 'absolute',
          left: oneMarkerLeftPosition - 20,
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
          left: twoMarkerLeftPosition - 20,
          top: 70,
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
    return (
      <View style={{
        position: 'relative',
        height: 30,
        width: '100%',
      }}>
        <View style={{
          position: 'absolute',
          left: oneMarkerLeftPosition - 20,
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
          left: twoMarkerLeftPosition - 25,
          top: 70,
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

  return (
    <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-r border-primary-200 p-7'
    style={{
        zIndex: 1000, 
        elevation: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }}
    >
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
                    width: 330,
                    height: 50,
                  }}
                />
              </View>
                <MultiSlider
                    values={[priceRange[0], priceRange[1]]}
                    sliderLength={330}
                    onValuesChange={setPriceRange}
                    min={500}
                    max={5000}
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
                    }}
                    enableLabel
                    customLabel={PriceLabel}
                />
            </View>
        </View>

        <View className='flex flex-col mt-8'>
            <Text className="text-base font-rubik-bold text-black-300">Property Type</Text>
            <NewFilters />
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
                    sliderLength={330}
                    onValuesChange={setAreaRange}
                    min={500}
                    max={3000}
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
                    }}
                    enableLabel
                    customLabel={AreaLabel}
                />
            </View>
        </View>

        <TouchableOpacity onPress={() => {}} className='flex-1 flex flex-row items-center justify-center bg-primary-300 shadow-md shadow-zinc-400 py-3 rounded-full mt-8 mb-5'>
            <Text className='text-white text-lg text-center font-rubik-bold'>Set Filter</Text>
        </TouchableOpacity>

    </View>
  )
}

export default FilterModal