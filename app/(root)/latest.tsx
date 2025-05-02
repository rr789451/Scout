import { Card } from '@/components/Cards'
import NoResults from '@/components/NoResults'
import icons from '@/constants/icons'
import { getLatestProperties } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const Latest = () => {
  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
      fn: getLatestProperties
  })

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)
  
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList 
        data={latestProperties}
        renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        contentContainerClassName='pb-5 gap-5 px-5 py-2'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          latestPropertiesLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="flex flex-row items-center justify-between mt-5">
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
              <Image 
                source={icons.backArrow}
                className="size-5"
              />
            </TouchableOpacity>
            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Our Featured Properties</Text>
            <Image 
              source={icons.bell}
              className="w-6 h-6"
            />
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default Latest