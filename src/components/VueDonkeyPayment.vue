<template>
  <div id="paypal-button"></div>
</template>

<script>
import Payment from '../classes/Payment'
import PayPal from '../classes/Gateways/PayPal'

export default {
  name: 'DonkeyPayment',
  mounted() {
    const payment = new Payment({
      type: this.serviceType,
      id: this.serviceId
    }, (res) => {
      this.$emit('payment_success', res)
    }, (err) => {
      this.$emit('payment_error', err)
    })

    const paypal = new PayPal(payment)

    paypal.paypalMode = this.paypalMode

    paypal.load()
  },
  props: {
    paypalMode: String,
    serviceType: String,
    serviceId: String|Number
  }
}
</script>
