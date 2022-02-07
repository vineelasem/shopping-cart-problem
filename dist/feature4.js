"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCart_1 = __importDefault(require("./getCart"));
const getCoupons_1 = __importDefault(require("./getCoupons"));
const toFixedDecimal_1 = __importDefault(require("./utils/toFixedDecimal"));
const taxRate = 0.0825;
const feature4 = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running Feature 4');
    try {
        const myCartPromise = (0, getCart_1.default)();
        const myCouponsPromise = (0, getCoupons_1.default)();
        const results = yield Promise.all([myCartPromise, myCouponsPromise]);
        const myCart = results[0];
        const myCoupons = results[1];
        const myCartWithDiscounts = myCart.map((item) => {
            //Find if coupon exist for the current SKU
            const coupon = myCoupons.find((coupon) => coupon.appliedSku === item.sku);
            if (coupon) {
                console.log(`Coupon found and applying for item sku: ${item.sku}, Original Price: ${item.price}, Discount: ${coupon.discountPrice}, New Price ${(0, toFixedDecimal_1.default)(item.price - coupon.discountPrice)}`);
                return Object.assign(Object.assign({}, item), { price: (0, toFixedDecimal_1.default)(item.price - coupon.discountPrice) });
            }
            else {
                return item;
            }
        });
        //console.log(myCartWithDiscounts)
        const subTotal = myCartWithDiscounts.map((item) => (item.price)).reduce((total, itemPrice) => (0, toFixedDecimal_1.default)(itemPrice + total), 0);
        const subTotalWithSalesTax = myCartWithDiscounts.filter((item) => item.isTaxable === true).map((totalprice) => totalprice.price).reduce((total, itemprice) => (0, toFixedDecimal_1.default)(itemprice + total), 0);
        const salesTaxTotal = (0, toFixedDecimal_1.default)(subTotalWithSalesTax * taxRate);
        console.log(`Sub Total: ${subTotal}`);
        console.log(`Sales Tax Total: ${salesTaxTotal}`);
        const grandTotal = (0, toFixedDecimal_1.default)(subTotal + salesTaxTotal);
        console.log(`Grand Total: ${grandTotal}`);
        console.log('Completed running Feature 4');
        return { subTotal: subTotal, salesTaxTotal: salesTaxTotal, grandTotal: grandTotal, itemsCount: myCart.length, items: myCartWithDiscounts };
    }
    catch (error) {
        console.log('Error occured in feature 2:', error);
    }
    console.log('###############################');
});
exports.default = feature4;
