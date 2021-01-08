"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scripts_1 = require("donkey-helpers-js/lib/scripts");
var PAYPAL_CHECKOUT_BUTTON_URL = 'https://www.paypalobjects.com/api/checkout.js';
var PayPal = /** @class */ (function () {
    function PayPal(payment, selector) {
        if (selector === void 0) { selector = '#paypal-button'; }
        this.buttonStyle = {
            shape: 'rect',
            size: 'medium',
            color: 'gold',
            label: 'paypal',
            tagline: false,
            fundingicons: true,
        };
        this.selector = '#paypal-button';
        this.brandName = 'ims';
        this.locale = 'it_IT';
        this.paypalMode = 'sandobox';
        this.payment = payment;
        this.selector = selector;
    }
    PayPal.prototype.load = function () {
        var _this = this;
        scripts_1.addScript(PAYPAL_CHECKOUT_BUTTON_URL, function () {
            window.paypal.Button.render({
                locale: _this.locale,
                style: _this.buttonStyle,
                env: _this.paypalMode,
                payment: function () {
                    _this.payment.gateway = 'paypal';
                    return _this.payment.prepare().then(function (res) {
                        return res.data.gateway.result.id;
                    });
                },
                onAuthorize: function (data) {
                    return _this.payment.execute({ paypal_id: data.paymentToken });
                }
            }, _this.selector);
        });
    };
    return PayPal;
}());
exports.default = PayPal;
