import { View, Text, FlatList, ScrollView, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/lib/useAppwrite';
import { getPropertyByID } from '@/lib/appwrite';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { facilities } from '@/constants/data';
import MapView, {Marker} from 'react-native-maps';
import Comment from '@/components/Comment';
import ImageView from "react-native-image-viewing";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height
  const { data: property } = useAppwrite({
    fn: getPropertyByID,
    params:{
      id: id!,
    },
  });

  const formattedGalleryImages = React.useMemo(() => {
    return (property as any)?.gallery?.map((item: { image: any; }) => ({
      uri: item.image
    })) || [];
  }, [(property as any)?.gallery]);

  const [visible, setIsVisible] = useState(false);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: (property as any)?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-rubik-extrabold">
            {(property as any)?.name}
          </Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {(property as any)?.type}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
                {(property as any)?.reviews.length > 0 ? 
                <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                      {(property as any)?.rating} ({(property as any)?.reviews.length} reviews)
                </Text>
                : 
                <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                      {(property as any)?.reviews.length} ({(property as any)?.reviews.length} reviews)
                </Text>
                }
          </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {(property as any)?.bedrooms} Beds
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {(property as any)?.bathrooms} Bath
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {(property as any)?.area} sqft
            </Text>
          </View>

          <View className='w-full border-t border-primary-200 pt-7 mt-5'>
            <Text className='text-black-300 text-xl font-rubik-bold'>Agent</Text>
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: (property as any)?.agent.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-3 justify-center">
                  <Text className="text-lg font-rubik-bold text-start text-black-300">{(property as any)?.agent.name}</Text>
                  <Text className="text-sm font-rubik-medium text-start text-black-200">Owner</Text>
                </View>
              </View>
              <View className='flex flex-row gap-7'>
                <Image 
                  source={icons.chat}
                  className="size-7"
                />
                <Image 
                  source={icons.phone}
                  className='size-7'
                />
              </View>
            </View>
          </View>

          <View className='mt-7'>
            <Text className='text-black-300 text-xl font-rubik-bold'>Overview</Text>
            <Text className='text-black-200 text-sm font-rubik mt-3'>{(property as any)?.description}</Text>
          </View>

          <View className='mt-7'>
            <Text className='text-black-300 text-xl font-rubik-bold'>Facilities</Text>

            {(property as any)?.facilities.length > 0 && (
              <View className='flex flex-row flex-wrap items-start justify-start mt-2 gap-5'>
                {(property as any)?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return(
                    <View key={index} className='flex flex-1 flex-col items-center min-w-20 max-w-24'>
                      <View className='size-14 bg-primary-100 rounded-full flex items-center justify-center'>
                        <Image 
                          source={facility ? facility.icon : icons.info}
                          className='size-6'
                        />
                      </View>
                      <Text numberOfLines={1} ellipsizeMode='tail' className='text-black-300 text-sm text-center font-rubik mt-1.5'>{item}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

            {(property as any)?.gallery.length > 0 && (
              <View className='mt-7'>
                <Text className='text-black-300 text-xl font-rubik-bold'>Gallery</Text>
                <FlatList 
                  contentContainerStyle={{ paddingRight: 20 }}
                  data={(property as any)?.gallery}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => setIsVisible(true)}>
                      <Image 
                        source={{ uri: item.image}}
                        className='size-40 rounded-xl'
                      />
                    </TouchableOpacity>
                  )}
                  contentContainerClassName='flex gap-4 mt-3'
                />
              </View>
            )}
            
            <ImageView
              images={formattedGalleryImages}
              keyExtractor={(property as any)?.gallery.$id}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
              animationType='fade'
              presentationStyle='fullScreen'
              swipeToCloseEnabled={true}
              doubleTapToZoomEnabled={true}
            />

          <View className='mt-7'>
           <Text className='text-black-300 text-xl font-rubik-bold'>Location</Text>
           <View className='flex flex-row items-start justify-start gap-1 mt-3'>
            <Image 
              source={icons.location}
              className='size-6'
            />
            <Text className='text-black-200 text-md font-rubik-medium mt-0.5'>{(property as any)?.address}</Text>
           </View>
           <View className='mt-5 w-100'>
            <MapView 
              style={{ width: '100%', height: 200, borderRadius: 20 }}
              initialRegion={{
                latitude: 40.682535131853314,
                longitude: -73.94307094540474,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}  
            >
              <Marker 
                coordinate={{latitude: 40.682535131853314, longitude: -73.94307094540474}}
              />
            </MapView>
           </View>
          </View>

          {(property as any)?.reviews.length > 0 ? (
            <View className='mt-7'>
              <View className='flex flex-row items-center justify-between'>
                <View className='flex flex-row items-center'>
                  <Image 
                    source={icons.star}
                    className='size-6'
                  />
                  <Text className='text-xl text-black-300 font-rubik-bold ml-2'>{(property as any)?.rating}  ({(property as any)?.reviews.length} reviews)</Text>
                </View>
                <TouchableOpacity>
                  <Text className='text-base text-primary-300 font-rubik-bold'>See All</Text>
                </TouchableOpacity>
              </View>

              <View className='mt-5'>
                <Comment item={(property as any)?.reviews[0]}/>
              </View>
            </View>
          )
          :
            <View className='mt-7'>
              <View className='flex flex-row items-center justify-between'>
                <View className='flex flex-row items-center'>
                  <Image 
                    source={icons.star}
                    className='size-6'
                  />
                  <Text className='text-xl text-black-300 font-rubik-bold ml-2'>{(property as any)?.reviews.length}  ({(property as any)?.reviews.length} reviews)</Text>
                </View>
                <Text className='text-base text-primary-300 font-rubik-bold'>No Reviews Yet</Text>
              </View>
            </View>
          }
        </View>
      </ScrollView>

      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-r border-primary-200 p-7'>
          <View className='flex flex-row items-center justify-between gap-10'>
            <View className='flex flex-col items-start'>
              <Text className='text-xs text-black-200 font-rubik-medium'>PRICE</Text>
              <Text numberOfLines={1} className='text-xl text-start text-primary-300 font-rubik-bold'>$ {(property as any)?.price}</Text>
            </View>

            <TouchableOpacity onPress={() => {}} className='flex-1 flex flex-row items-center justify-center bg-primary-300 shadow-md shadow-zinc-400 py-3 rounded-full'>
              <Text className='text-white text-lg text-center font-rubik-bold'>Book Now</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default Property