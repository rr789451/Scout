import Comment from '@/components/Comment';
import NoResults from '@/components/NoResults';
import icons from '@/constants/icons';
import { getPropertyByID } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

function Reviews() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: property, loading } = useAppwrite({
    fn: getPropertyByID,
    params:{
        id: id!,
    },
    });
  return (
    <SafeAreaView className='bg-white h-full'>
        <FlatList 
            data={(property as any)?.reviews || []}
            renderItem={({item}) => <Comment item={item} />}
            keyExtractor={(item) => item.$id}
            contentContainerClassName='pb-5 gap-5 px-5 py-2'
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className='w-full border-t border-primary-200 mt-5' />}
            ListEmptyComponent={
                loading ? (
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
                    <Text className="text-xl text-center font-rubik-bold text-black-300">{(property as any)?.name}</Text>
                    <Text className='opacity-0'/>
                </View>
            }
        />
    </SafeAreaView>
  )
}

export default Reviews