declare global {
  interface Window { paypal: any; }
}

import { addScript } from 'donkey-helpers-js/lib/scripts'
import Payment from '../Payment'

type PaypalPrepareResponse = {
  result: {
    id: string
  }
}

const PAYPAL_CHECKOUT_BUTTON_URL = 'https://www.paypalobjects.com/api/checkout.js'

class PayPal {
  buttonStyle: PayPalButtonStyle = {
    shape: 'rect',
    size: 'medium',
    color: 'gold',
    label: 'paypal',
    tagline: false,
    fundingicons: true,
  }

  payment: Payment

  selector: string = '#paypal-button'

  constructor (
    payment: Payment, 
    selector: string = '#paypal-button'
  ) {
    this.payment = payment
    this.selector = selector
  }

  load () {
    addScript(PAYPAL_CHECKOUT_BUTTON_URL, () => {
      window.paypal.Button.render({
        locale: this.locale,
        style: this.buttonStyle,
        env: this.paypalMode,
        payment: () => {
          this.payment.gateway = 'paypal'

          return this.payment.prepare().then(res => {
            return (res.data.gateway as PaypalPrepareResponse).result.id
          })
        },
        onAuthorize: (data: Record<string, string>) => {
          return this.payment.execute({paypal_id: data.paymentToken})
        }
      }, this.selector)
    })
  }

  brandName = 'ims'

  locale: PayPalButtonLocale = 'it_IT'

  paypalMode: PayPalMode = 'sandbox'
}

interface PayPalButtonStyle {
  shape: PayPalButtonShape,
  size: PayPalButtonSize,
  color: PayPalButtonColor,
  label: PayPalButtonLabel,
  tagline: boolean,
  fundingicons: PayPalButtonFundingIcons,
}

/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#color */
export type PayPalButtonColor = 'gold' | 'blue' | 'silver' | 'white' | 'black'

/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#shape */
export type PayPalButtonShape = 'pill' | 'rect'

/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#size */
export type PayPalButtonSize = 'small' | 'medium' | 'large' | 'responsive'

/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#label */
export type PayPalButtonLabel = 'checkout' | 'credit' | 'pay' | 'buynow' | 'paypal' | 'installment'

/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#layout */
export type PayPalButtonLayout = 'horizontal' | 'vertical'

/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/# */
export type PayPalButtonFundingIcons = boolean

/** @see https://developer.paypal.com/docs/archive/checkout/reference/supported-locales */
export type PayPalButtonLocale = 'it_IT' | 'en_IT' | 'en_US'

export type PayPalMode = 'sandbox' | 'production'

export default PayPal
