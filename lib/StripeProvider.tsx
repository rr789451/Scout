import React from 'react'
import { StripeProvider as StripeProviderNative } from '@stripe/stripe-react-native'

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51PtaY0Af4C1BWu53ifsxz9OdCXXY156XNf4oNrUIgHlORESKdJn1cfBOXmncaTFIpOLEzAEAUNeDf8YnrRV0nBJ200ZxO34GLm'

export function StripeProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  return (
    <StripeProviderNative
        publishableKey={STRIPE_PUBLISHABLE_KEY}
        merchantIdentifier='merchant.com.scout.app'
    >
        {children}
    </StripeProviderNative>
  )
}