declare global {
    interface Window {
        paypal: any;
    }
}
import Payment from '../Payment';
declare class PayPal {
    buttonStyle: PayPalButtonStyle;
    payment: Payment;
    selector: string;
    constructor(payment: Payment, selector?: string);
    load(): void;
    brandName: string;
    locale: PayPalButtonLocale;
    paypalMode: string;
}
interface PayPalButtonStyle {
    shape: PayPalButtonShape;
    size: PayPalButtonSize;
    color: PayPalButtonColor;
    label: PayPalButtonLabel;
    tagline: boolean;
    fundingicons: PayPalButtonFundingIcons;
}
/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#color */
declare type PayPalButtonColor = 'gold' | 'blue' | 'silver' | 'white' | 'black';
/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#shape */
declare type PayPalButtonShape = 'pill' | 'rect';
/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#size */
declare type PayPalButtonSize = 'small' | 'medium' | 'large' | 'responsive';
/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#label */
declare type PayPalButtonLabel = 'checkout' | 'credit' | 'pay' | 'buynow' | 'paypal' | 'installment';
/** @see https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/# */
declare type PayPalButtonFundingIcons = boolean;
/** @see https://developer.paypal.com/docs/archive/checkout/reference/supported-locales */
declare type PayPalButtonLocale = 'it_IT' | 'en_IT' | 'en_US';
export default PayPal;
