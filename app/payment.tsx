import { useGlobalContext } from '@/lib/global-provider';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { CardForm, confirmSetupIntent, createPaymentMethod } from '@stripe/stripe-react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { Card, SingleCard } from '@/components/Cards';
import { getPropertyByID } from '@/lib/appwrite';

const getCardType = ({ number } : { number: string }) => {
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.substring(0,2);

    if (number.startsWith('4')) {
        return 'visa';
    } else if (['51', '52', '53', '54', '55'].includes(firstTwoDigits) || (parseInt(firstTwoDigits) >= 22 && parseInt(firstTwoDigits) <= 27)) {
        return 'mastercard';
    } else if (['34', '37'].includes(firstTwoDigits)) {
        return 'americanexpress';
    } else if (['65', '62', '6'].includes(firstTwoDigits) || firstDigit === '6') {
        return 'discover';
    }
};

function Payment() {
  const { user } = useGlobalContext();
  const { propertyId, propertyName, rentAmount, imageUrl, address, startDate, duration } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [priceId, setPriceId] = useState('');
  const [intentId, setIntentId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cardType, setCardType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    createPaymentIntent();

    return () => {
        if(loading) {
            setLoading(false);
        }
    };
  }, []);

  useEffect(() => {
    if(cardNumber) {
        setCardType(getCardType({ number: cardNumber }) || '');
    } else {
        setCardType('');
    }
  }, [cardNumber]);

  const createPaymentIntent = async () => {
    try {
        setLoading(true);

        const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/create-subscription`, {
            amount: rentAmount,
            propertyId,
            userId: user?.$id,
            email: user?.email,
            name: user?.name,
            propertyName: propertyName,
        });

        setClientSecret(response.data.clientSecret);
        setCustomerId(response.data.customerId);
        setIntentId(response.data.setupIntentId);
        setPriceId(response.data.priceId);
    } catch (error) {
        Alert.alert('Subscription Setup Error', 'We encountered an issue setting up your subscription. Please try again.');
        router.back();
        console.log('Payment Intent Error:', error);
    } finally {
        setLoading(false);
    }
  };

  const isFormValid = () => {
    return cardComplete && cardName.length >= 3;
  };

  const handlePayment = async () => {
    if(!cardComplete) {
        Alert.alert('Incomplete Information', 'Please complete your card details before proceeding.');
        return;
    }

    try {
        setLoading(true);
        setPaymentStatus('Processing payment...');

        const { paymentMethod: stripePaymentMethod, error } = await createPaymentMethod({
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails: {
                    email: user?.email,
                    name: user?.name,
                },
            },
        });

        if(error) {
            throw new Error('Payment method creation failed');
        }

        const { error: confirmError } = await confirmSetupIntent(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails: {
                    email: user?.email,
                    name: user?.name,
                },
            },
        });

        if(confirmError) {
            throw new Error('Payment confirmation failed');
        }

        const finalizeResponse = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/finalize-subscription`, {
            customerId: customerId,
            priceId: priceId,
            paymentMethodId: stripePaymentMethod.id,
            propertyId,
            userId: user?.$id
        });

        await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/confirm-subscription`, {
            userId: user?.$id,
            propertyId,
            paymentMethodId: stripePaymentMethod.id,
            stripeSubscriptionId: finalizeResponse.data.subscriptionId,
            stripeCustomerId: finalizeResponse.data.customerId,
            stripePriceId: finalizeResponse.data.priceId,
            amount: finalizeResponse.data.amount,
            currency: finalizeResponse.data.currency,
            startDate: new Date(Array.isArray(startDate) ? startDate[0] : startDate).toISOString(),
            duration: duration
        });

        setPaymentStatus('Payment Successful!');

        setTimeout(() => {
            router.replace({
                pathname: '/paymentSuccess/[propertyName]',
                params: { 
                    propertyName: Array.isArray(propertyName) ? propertyName[0] : propertyName,
                    imageUrl: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl,
                },
              });  
        }, 1000);
    } catch (error) {
        setPaymentStatus('');
        Alert.alert('Payment Failed', 'We could not process your payment. Please check your details and try again.');
        router.back();
        console.log('Payment processing error:', error);
    } finally {
        setLoading(false);
    }
  };

  const getCardLogo = () => {
    switch (cardType) {
        case 'visa':
            return images.visa;
        case 'mastercard':
            return images.mastercard;
        case 'discover':
            return images.discover;
        case 'americanexpress':
            return images.amex;
        default:
            return null;
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
        <Stack.Screen options={{ headerShown: false }} />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView className='flex-1 p-4' keyboardShouldPersistTaps="handled" keyboardDismissMode='interactive'>
                <View className="flex flex-row items-center justify-between mt-5 mb-10">
                    <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                    <Image 
                        source={icons.backArrow}
                        className="size-5"
                    />
                    </TouchableOpacity>
                    <Text className="text-xl mr-2 text-center font-rubik-medium text-black-300">Setup Rental Payment</Text>
                    <Text className='opacity-0'/>
                </View>
                <View className='mb-6 p-4 bg-primary-300 rounded-lg'>
                    <Text className='text-lg font-rubik-bold mb-2 text-white'>Property Details</Text>
                    <SingleCard 
                        imageUrl={Array.isArray(imageUrl) ? imageUrl[0] : imageUrl}
                        name={Array.isArray(propertyName) ? propertyName[0] : propertyName}
                        address={Array.isArray(address) ? address[0] : address}
                        price={Array.isArray(rentAmount) ? rentAmount[0] : rentAmount}
                        startDate={new Date(Array.isArray(startDate) ? startDate[0] : startDate).toLocaleDateString('en-GB')}
                        duration={Array.isArray(duration) ? Number(duration[0]) : Number(duration)}
                    />
                </View>

                <Text className='text-2xl font-rubik-bold text-black mb-4'>Your Card Info</Text>

                <View className='flex-col mb-6'>
                    <TouchableOpacity 
                        className={`flex-1 flex-row items-center justify-center p-3 items-center rounded-lg mb-2 ${paymentMethod === 'card' ? 'bg-primary-300 border-b-2 border-primary-200' : 'bg-black-200'}`}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <Image 
                            source={icons.cardWhite}
                            className='size-7 mx-4'
                        />
                        <Text className={`mt-1 ${paymentMethod === 'card' ? 'text-white font-rubik-medium' : 'text-black'}`}>Credit Cards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`flex-1 flex-row items-center justify-center p-3 items-center rounded-lg mb-2 ${paymentMethod === 'paypal' ? 'bg-primary-300 border-b-2 border-primary-200' : 'bg-black-200'}`}
                        onPress={() => setPaymentMethod('paypal')}
                    >
                        <Image 
                            source={icons.paypal}
                            className='size-7 mx-4'
                        />
                        <Text className={`mt-1 ${paymentMethod === 'paypal' ? 'text-white font-rubik-medium' : 'text-black'}`}>Paypal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`flex-1 flex-row items-center justify-center p-3 items-center rounded-lg mb-2 ${paymentMethod === 'applepay' ? 'bg-primary-300 border-b-2 border-primary-200' : 'bg-black-200'}`}
                        onPress={() => setPaymentMethod('applepay')}
                    >
                        <Image 
                            source={icons.applepay}
                            className='size-7 mx-4'
                        />
                        <Text className={`mt-1 ${paymentMethod === 'applepay' ? 'text-white font-rubik-medium' : 'text-black'}`}>Apple Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`flex-1 flex-row items-center justify-center p-3 items-center rounded-lg mb-2 ${paymentMethod === 'googlepay' ? 'bg-primary-300 border-b-2 border-primary-200' : 'bg-black-200'}`}
                        onPress={() => setPaymentMethod('googlepay')}
                    >
                        <Image 
                            source={icons.googlepay}
                            className='size-7 mx-4'
                        />
                        <Text className={`mt-1 ${paymentMethod === 'googlepay' ? 'text-white font-rubik-medium' : 'text-black'}`}>Google Pay</Text>
                    </TouchableOpacity>
                </View>

                {paymentMethod === 'card' && (
                    <View>
                        <View className='mb-6 p-6 bg-primary-200 rounded-xl'>
                            <View className='flex-row justify-between items-center mb-2'>
                                <Text className='text-xl text-black'>{cardName || 'Name'}</Text>
                                {getCardLogo() ? (
                                    <Image 
                                        source={getCardLogo()}
                                        className='size-8'
                                        resizeMode='contain'
                                    />
                                ):(
                                    <Image 
                                        source={icons.card}
                                        className='size-6'
                                        resizeMode='contain'
                                    />
                                )}
                            </View>

                            <View className='mb-2'>
                                <Image 
                                    source={images.chip}
                                    className='w-12 h-8'
                                    resizeMode='contain'
                                />
                            </View>

                            <Text className='text-xl tracking-wider mb-8 font-semibold'>
                                {cardNumber || '•••• •••• •••• ••••'}
                            </Text>

                            <View className='flex-row justify-start'>
                                <Text className='text-black'>{expiry || 'MM/YY'}</Text>
                                <Text className='text-black ml-auto'>•••</Text>
                            </View>
                        </View>

                        <View className='mb-6'>
                            <View className='mb-4'>
                                <Text className='text-base font-rubik-medium text-black mb-2'>
                                    Card Name <Text className='text-danger'>*</Text>
                                </Text>
                                <TextInput 
                                    className='w-full p-4 border border-black-200 rounded-lg'
                                    placeholder='Cardholder Name'
                                    placeholderTextColor='#8C8E98'
                                    value={cardName}
                                    onChangeText={setCardName}
                                />
                            </View>

                            <CardForm
                                cardStyle={{
                                    backgroundColor: '#8C8E98',
                                    placeholderColor: '#000000',
                                    textColor: '#666666',
                                    borderWidth: 1,
                                    borderColor: '#E5F3FF',
                                    borderRadius: 8,
                                    fontSize: 16,
                                }}
                                style={{
                                    width: '100%',
                                    height: 300,
                                    marginBottom: -120,
                                }}
                                onFormComplete={(cardDetails) => {
                                    if (cardDetails.complete) {
                                        setCardComplete(true);
                                        
                                        if (cardDetails.brand) {
                                            setCardType(cardDetails.brand.toLowerCase());
                                        }
                                        
                                        const lastFour = cardDetails.last4 || '••••';
                                        setCardNumber(`•••• •••• •••• ${lastFour}`);
                                        
                                        if (cardDetails.expiryMonth && cardDetails.expiryYear) {
                                            const month = String(cardDetails.expiryMonth).padStart(2, '0');
                                            const year = String(cardDetails.expiryYear).slice(-2);
                                            setExpiry(`${month}/${year}`);
                                        }
                                    } else {
                                        setCardComplete(false);
                                    }
                                }}
                                />
                        </View>
                    </View>
                )}

                {paymentMethod === 'paypal' && (
                    <View className='items-center p-6 mb-6 bg-primary-200 rounded-lg'>
                        <Image 
                            source={images.paypal}
                            className='w-24 h-24 mb-4'
                            resizeMode='contain'
                        />
                        <Text className='text-center text-black mb-4'>You'll be redirected to PayPal to complete your payment securely.</Text>
                        <TouchableOpacity
                            className='p-3 bg-primary-300 rounded-lg w-full'
                            onPress={() => Alert.alert('PayPal', 'PayPal integration would go here')}
                        >
                            <Text className='text-white text-center font-rubik-semibold'>Continue with PayPal</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {paymentMethod === 'applepay' && (
                    <View className='items-center p-6 mb-6 bg-primary-200 rounded-lg'>
                        <Image 
                            source={icons.applepay}
                            className='w-24 h-24 mb-4'
                            resizeMode='contain'
                        />
                        <Text className='text-center text-black mb-4'>You'll be redirected to ApplePay to complete your payment securely.</Text>
                        <TouchableOpacity
                            className='p-3 bg-primary-300 rounded-lg w-full'
                            onPress={() => Alert.alert('ApplePay', 'Apple Pay integration would go here')}
                        >
                            <Text className='text-white text-center font-rubik-semibold'>Continue with Apple Pay</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {paymentMethod === 'googlepay' && (
                    <View className='items-center p-6 mb-6 bg-primary-200 rounded-lg'>
                        <Image 
                            source={icons.googlepay}
                            className='w-24 h-24 mb-4'
                            resizeMode='contain'
                        />
                        <Text className='text-center text-black mb-4'>You'll be redirected to GooglePay to complete your payment securely.</Text>
                        <TouchableOpacity
                            className='p-3 bg-primary-300 rounded-lg w-full'
                            onPress={() => Alert.alert('GooglePay', 'Google Pay integration would go here')}
                        >
                            <Text className='text-white text-center font-rubik-semibold'>Continue with GooglePay</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {paymentStatus ? (
                    <View className='mb-4 p-3 bg-primary-200 rounded'>
                        <Text className='text-primary-300'>{paymentStatus}</Text>
                    </View>
                ) : null}

                {paymentMethod === 'card' && (
                    <TouchableOpacity
                        className={`p-4 rounded-lg ${!isFormValid() || loading || paymentStatus === 'Payment Successful!' ? 'bg-black-200' : 'bg-primary-300'}`}
                        disabled={!isFormValid() || loading}
                        onPress={handlePayment}
                    >
                        {loading ? (
                            <ActivityIndicator className='text-primary-300' />
                        ) : (
                            <Text className='text-white text-center font-rubik-semibold'>{paymentStatus === 'Payment Successful!' ? 'Redirecting..' : 'Complete Payment'}</Text>
                        )}
                    </TouchableOpacity>
                )}

                <View className={`items-center mb-2 ${paymentMethod === 'card' ? 'mt-4' : ''}`}>
                    <View className='flex-row items-center mb-4'>
                        <Image 
                            source={icons.lock}
                            className='size-8'
                            resizeMode='contain'
                        />
                        <Text className='text-black ml-2'>Secure Payment</Text>
                    </View>
                    <Text className='text-sm text-black-200 text-center'>
                        Your payment information is securely processed. We do not store your payment details.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Payment;