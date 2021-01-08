"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Http_1 = __importDefault(require("donkey-axios-wrapper/lib/Http"));
var Payment = /** @class */ (function () {
    function Payment(purchasable, onSuccess, onFailure, imsId, gateway) {
        if (imsId === void 0) { imsId = null; }
        if (gateway === void 0) { gateway = 'paypal'; }
        this.extraPayload = {};
        this.paymentId = '';
        this.imsId = null;
        this.purchasable = purchasable;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.imsId = imsId;
        this.gateway = gateway;
    }
    Payment.prototype.prepare = function () {
        var _this = this;
        var payload = {
            gateway: this.gateway,
            purchasable: this.purchasable,
        };
        if (this.imsId) {
            payload.ims_id = this.imsId;
        }
        return Http_1.default.post('v1/payments', payload)
            .then(function (res) {
            _this.paymentId = res.data.payment_id;
            return res;
        });
    };
    Payment.prototype.execute = function (extraPayload) {
        if (extraPayload === void 0) { extraPayload = {}; }
        var payload = {
            gateway: this.gateway,
            payment_id: this.paymentId,
        };
        if (this.imsId) {
            payload.ims_id = this.imsId;
        }
        return Http_1.default.patch('v1/payments', __assign(__assign({}, payload), extraPayload)).then(this.onSuccess)
            .catch(this.onFailure);
    };
    Payment.prototype.setPurchasable = function (purchasable) {
        this.purchasable = purchasable;
    };
    return Payment;
}());
exports.default = Payment;
