import { Card } from '@/components/Cards'
import NoResults from '@/components/NoResults'
import icons from '@/constants/icons'
import { fetchBookmarkedProperties } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { useAppwrite } from '@/lib/useAppwrite'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useMemo } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

function Bookmarked() {
  const { user } = useGlobalContext();

  const { data: bookmarkedProperties, loading, refetch } = useAppwrite({
    fn: fetchBookmarkedProperties,
    params: {
        user: user
    },
    skip: !user
  });

  const bookmarkIds = useMemo(() => {
    return user?.bookmarkedProperties?.join(',') || '';
  }, [user?.bookmarkedProperties]);

  useEffect(() => {
    if (user && bookmarkIds) {
      refetch({ user: user });
    }
  }, [bookmarkIds, user?.$id]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        refetch({ user: user });
      }
    }, [user?.$id])
  );

  const handleCardPress = (id: string) => router.push(`/properties/${id}`) 

  return (
        <SafeAreaView className='bg-white h-full'>
        <FlatList 
            data={bookmarkedProperties}
            numColumns={2}
            renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
            keyExtractor={(item) => item.$id}
            contentContainerClassName="pb-32 px-5 gap-5 flex"
            columnWrapperClassName='gap-5 flex'
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                loading ? (
                    <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                  ) : <NoResults />
            }
            ListHeaderComponent={
                <View className="flex flex-row items-center justify-between mt-5">
                    <TouchableOpacity onPress={() => router.replace('/profile')} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                    <Image 
                        source={icons.backArrow}
                        className="size-5"
                    />
                    </TouchableOpacity>
                    <Text className="text-xl text-center font-rubik-bold text-black-300">The Wishlist</Text>
                    <Text className='opacity-0'/>
                </View>
            }
        />
    </SafeAreaView>
  )
}

export default Bookmarked