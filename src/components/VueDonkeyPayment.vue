<template>
  <div id="paypal-button"></div>
</template>

<script>
import Payment from '../classes/Payment'
import PayPal from '../classes/Gateways/PayPal'

export default {
  name: 'DonkeyPayment',
  props: {
    service: Object
  },
  mounted() {
    const payment = new Payment({
      type: 'ims_service',
      id: this.service.id
    }, (res) => {
      this.$emit('payment_success', res)
    }, (err) => {
      this.$emit('payment_error', err)
    })

    const paypal = new PayPal(payment)

    paypal.load()
  }
}
</script>
