import { CallbackAxiosResponse } from 'donkey-axios-wrapper/lib/types';
import Purchasable from './Purchasable';
import { AxiosPromise } from 'axios';
declare type CallbackError = (err: unknown) => void;
declare type PaymentPrepareResponse = {
    payment_id: string;
    gateway: unknown;
};
declare class Payment {
    gateway: PaymentGateway;
    purchasable: Purchasable;
    extraPayload: PaymentExtraPayload;
    onSuccess: CallbackAxiosResponse;
    onFailure: CallbackError;
    paymentId: string;
    imsId: string | null;
    constructor(purchasable: Purchasable, onSuccess: CallbackAxiosResponse, onFailure: CallbackError, imsId?: string | null, gateway?: PaymentGateway);
    prepare(): AxiosPromise<PaymentPrepareResponse>;
    execute(extraPayload?: PaymentExtraPayload): Promise<void>;
    setPurchasable(purchasable: Purchasable): void;
}
interface PaymentExtraPayload {
    paypal_id?: string;
}
declare type PaymentGateway = 'paypal' | 'cash';
export default Payment;
