<template>
  <div id="paypal-button"></div>
</template>

<script>
import Payment from '../classes/Payment'
import PayPal from '../classes/Gateways/PayPal'

export default {
  name: 'DonkeyPayment',
  mounted() {
    const imsId = this.imsId || null

    const payment = new Payment({
      type: this.serviceType,
      id: this.serviceId
    }, (res) => {
      this.$emit('success', res)
    }, (err) => {
      this.$emit('error', err)
    }, this.imsId)

    const paypal = new PayPal(payment)

    paypal.paypalMode = this.paypalMode

    paypal.load()
  },
  props: {
    paypalMode: String,
    serviceType: String,
    serviceId: String|Number,
    imsId: String
  }
}
</script>
