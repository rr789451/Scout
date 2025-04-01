import { View, Text, Image } from 'react-native'
import React from 'react'
import { Models } from 'react-native-appwrite'
import icons from '@/constants/icons'

interface Props {
    item: Models.Document
}

const Comment = ({item}: Props) => {
  const commentDate = new Date(item.$createdAt);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - commentDate.getTime();

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <View className='flex flex-col items-start'>
        <View className='flex flex-row items-center'>
            <Image
                source={{ uri: item.avatar }}
                className='size-14 rounded-full' 
            />
            <Text className='text-black-300 text-xl font-rubik-bold ml-4'>{item.name}</Text>
        </View>

        <Text className='text-black-200 text-md font-rubik-medium mt-5'>{item.review}</Text>

        <View className='flex flex-row items-center w-full justify-between mt-5'>
            <View className='flex flex-row items-center'>
                <Image 
                    source={icons.heart}
                    className='size-5'
                    tintColor={'#0061FF'}
                />
                <Text className='text-sm text-black-300 font-rubik-medium ml-2'>10</Text>
            </View>
            <Text className='text-black-100 text-sm font-rubik-medium'>{diffDays} days ago</Text>
        </View>
    </View>
  )
}

export default Comment