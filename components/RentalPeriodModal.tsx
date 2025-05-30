import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

interface RentalPeriodModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (startDate: Date, duration: number) => void;
  propertyId: string,
  propertyName: string,
  rentAmount: number,
  imageUrl: string,
  address: string,
}

function RentalPeriodModal({ visible, onClose, onConfirm, propertyId, propertyName, rentAmount, imageUrl, address }: RentalPeriodModalProps) {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 17);

    const [startDate, setStartDate] = useState(minDate);
    const [duration, setDuration] = useState(3);

    const handleConfirm = async () => {
        await onConfirm(startDate, duration);

        router.push({
            pathname: '/payment',
            params:{
                propertyId: propertyId,
                propertyName: propertyName,
                rentAmount: rentAmount,
                imageUrl: imageUrl,
                address: address,
                startDate: startDate.toISOString(),
                duration: duration
            }
        })

        onClose();
    }


  return (
    <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        className='m-0 justify-end'
    >
        <View className='bg-white p-6 rounded-t-3xl'>
            <Text className='text-2xl font-rubik-bold text-black text-center mb-2'>Select Rental Period</Text>
            <Text className='text-black text-center mb-6'>Choose your move-in date and lease duration</Text>

            <Text className='text-lg font-rubik-semibold text-black mb-3'>Move-in Date</Text>
            <View className='bg-black-300 rounded-xl py-2 mb-6 text-white'>
                <DateTimePicker 
                    value={startDate}
                    mode='date'
                    display='default'
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onChange={(event, date) => setStartDate(date!)}
                />
            </View>

            <Text className='text-lg font-rubik-semibold text-black mb-3'>Lease Duration: {duration} months</Text>
            <View className='bg-black-300 rounded-xl mb-6 text-white'>
                <Picker
                    selectedValue={duration}
                    onValueChange={(value) => {setDuration(value)}}
                    className='h-32'
                >
                    {[3, 6, 12, 18, 24, 36].map(months => (
                        <Picker.Item key={months} label={`${months} months`} value={months} />
                    ))}
                </Picker>
            </View>

            <View className='flex-row gap-3'>
                <TouchableOpacity
                    onPress={onClose}
                    className='flex-1 bg-danger py-4 rounded-xl'
                >
                    <Text className='text-white font-rubik-semibold text-center'>Cancel</Text>
                </TouchableOpacity>

                {startDate && duration ? 
                    (
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className='flex-1 bg-primary-300 py-4 rounded-xl'
                        >
                            <Text className='text-white font-rubik-semibold text-center'>Confirm</Text>
                        </TouchableOpacity>
                    )
                    :
                    (
                        <TouchableOpacity
                            className='flex-1 bg-gray-300 py-4 rounded-xl'
                            disabled
                        >
                            <Text className='text-white font-rubik-semibold text-center'>Confirm</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    </Modal>
  )
}

export default RentalPeriodModal