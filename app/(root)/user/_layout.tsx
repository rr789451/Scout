import { Stack } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

const UserLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen 
        name="rented" 
        options={{
          headerShown: false,
          title: 'My Rentals',
          headerBackVisible: false
        }} 
      />
    </Stack>
  )
}

export default UserLayout