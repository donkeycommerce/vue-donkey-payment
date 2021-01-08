<template>
  <div id="paypal-button"></div>
</template>

<script>
import Payment from '../classes/Payment'
import PayPal from '../classes/Gateways/PayPal'

export default {
  name: 'DonkeyPayment',
  data() {
    return {
      payment: null
    }
  },
  mounted() {
    const imsId = this.imsId || null

    this.payment = new Payment({
      type: this.serviceType,
      id: this.serviceId
    }, (res) => {
      this.$emit('success', res)
    }, (err) => {
      this.$emit('error', err)
    }, this.imsId)

    const paypal = new PayPal(this.payment)

    paypal.paypalMode = this.paypalMode

    paypal.load()
  },
  props: {
    paypalMode: String,
    serviceType: String,
    serviceId: String|Number,
    imsId: String
  },
  watch: {
    serviceType: (val) => {
      this.payment.purchasable.type = val
    },
    serviceId: (val) => {
      this.payment.purchasable.id = val
    },
    imsId: (val) => {
      this.payment.imsId = val
    }
  }
}
</script>
