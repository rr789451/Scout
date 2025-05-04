import icons from '@/constants/icons';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

function PropertyName() {
  const { propertyName, imageUrl } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleViewProperty = () => {
    router.back();
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Stack.Screen options={{
        title: 'Subscription Successful',
        headerBackVisible: false
      }} 
      />

      <View className='flex-col justify-center items-center p-6'>
        <View className='w-full h-80 rounded-full justify-center items-center mb-6'>
          <View className='flex-1 w-full px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70'>
              <Image 
                  source={{ uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl }}
                  className='w-full h-full rounded-lg'
              />
          </View>
        </View>

        <Text className='text-2xl font-rubik-bold text-center mb-2'>Payment Successful!</Text>
        <Text className='text-black text-center mb-6'>Your subscription for{' '}<Text className='font-rubik-bold text-md'>{propertyName}</Text>{' '}has been successfully set up.</Text>

        <Text className='text-black text-center mb-6'>You will receive a confirmation email with all the details shortly.</Text>

        <View className='w-full space-y-4'>
          <TouchableOpacity className='p-4 bg-primary-300 rounded-md my-2' onPress={handleViewProperty}>
            <Text className='text-white text-center font-rubik-semibold'>View Property Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-4 bg-black-100 rounded-md my-2' onPress={handleGoHome}>
            <Text className='text-white text-center font-rubik-semibold'>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PropertyName