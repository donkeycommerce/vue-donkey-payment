interface Purchasable {
    id: string | number;
    type: PurchasableType;
}
declare type PurchasableType = 'order' | 'ims_service' | 'domain' | 'shipment';
export default Purchasable;
