import { CallbackAxiosResponse } from 'donkey-axios-wrapper/lib/types'
import Http from 'donkey-axios-wrapper/lib/Http'
import Purchasable from './Purchasable'
import { AxiosPromise } from 'axios'

type CallbackError = (err: unknown) => void

type PaymentPrepareResponse = {
  payment_id: string,
  gateway: unknown
}

class Payment {
  gateway: PaymentGateway

  purchasable: Purchasable

  extraPayload: PaymentExtraPayload = {}

  onSuccess: CallbackAxiosResponse

  onFailure: CallbackError

  paymentId: string = ''

  constructor (
    purchasable: Purchasable, 
    onSuccess: CallbackAxiosResponse,
    onFailure: CallbackError,
    gateway: PaymentGateway = 'paypal',
  ) {
    this.purchasable = purchasable
    this.gateway = gateway

    this.onSuccess = onSuccess
    this.onFailure = onFailure
  }

  prepare (): AxiosPromise<PaymentPrepareResponse> {
    return (Http.post('v1/payments', {
      gateway: this.gateway,
      purchasable: this.purchasable,
    }) as AxiosPromise<PaymentPrepareResponse>).then(res => {
      this.paymentId = res.data.payment_id
      return res
    })
  }

  execute (extraPayload: PaymentExtraPayload = {}) {
    return Http.patch('v1/payments', {
      gateway: this.gateway,
      payment_id: this.paymentId,
      ...extraPayload
    }).then(this.onSuccess)
    .catch(this.onFailure)
  }

  setPurchasable (purchasable: Purchasable) {
    this.purchasable = purchasable
  }
}

interface PaymentExtraPayload {
  paypal_id?: string
}

type PaymentGateway = 'paypal' | 'cash'

export default Payment