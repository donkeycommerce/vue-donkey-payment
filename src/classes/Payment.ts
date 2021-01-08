import { CallbackAxiosResponse } from 'donkey-axios-wrapper/lib/types'
import Http from 'donkey-axios-wrapper/lib/Http'
import Purchasable from './Purchasable'
import { AxiosPromise } from 'axios'

type CallbackError = (err: unknown) => void

type PaymentPrepareResponse = {
  payment_id: string,
  gateway: unknown
}

type PaymentPreparePayload = {
  gateway: PaymentGateway,
  purchasable: Purchasable,
  ims_id?: string
}

type PaymentExecutePayload = {
  gateway: PaymentGateway,
  payment_id: string,
  ims_id?: string
}

class Payment {
  gateway: PaymentGateway

  purchasable: Purchasable

  extraPayload: PaymentExtraPayload = {}

  onSuccess: CallbackAxiosResponse

  onFailure: CallbackError

  paymentId: string = ''

  imsId: string|null = null

  constructor (
    purchasable: Purchasable, 
    onSuccess: CallbackAxiosResponse,
    onFailure: CallbackError,
    imsId: string|null = null,
    gateway: PaymentGateway = 'paypal',
  ) {
    this.purchasable = purchasable
    this.onSuccess = onSuccess
    this.onFailure = onFailure
    this.imsId = imsId
    this.gateway = gateway
  }

  prepare (): AxiosPromise<PaymentPrepareResponse> {
    let payload: PaymentPreparePayload = {
      gateway: this.gateway,
      purchasable: this.purchasable,
    }

    if (this.imsId) {
      payload.ims_id = this.imsId
    }

    return (Http.post('v1/payments', payload) as AxiosPromise<PaymentPrepareResponse>)
      .then(res => {
        this.paymentId = res.data.payment_id
        return res
      })
  }

  execute (extraPayload: PaymentExtraPayload = {}) {
    let payload: PaymentExecutePayload = {
      gateway: this.gateway,
      payment_id: this.paymentId,
    }

    if (this.imsId) {
      payload.ims_id = this.imsId
    }

    return Http.patch('v1/payments', {
      ...payload,
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