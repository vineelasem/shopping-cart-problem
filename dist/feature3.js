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
const toFixedDecimal_1 = __importDefault(require("./utils/toFixedDecimal"));
const taxRate = 0.0825;
const feature3 = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running Feature 3');
    try {
        const myCart = yield (0, getCart_1.default)();
        const subTotal = myCart.map((item) => item.price).reduce((total, itemprice) => (0, toFixedDecimal_1.default)(itemprice + total), 0);
        const subTotalWithSalesTax = myCart.filter((item) => item.isTaxable === true).map((item) => item.price).reduce((total, itemPrice) => (0, toFixedDecimal_1.default)(itemPrice + total), 0);
        const salesTaxTotal = (0, toFixedDecimal_1.default)(subTotalWithSalesTax * taxRate);
        console.log(`Sub Total: ${subTotal}`);
        console.log(`Sales Tax Total: ${salesTaxTotal}`);
        const grandTotal = (0, toFixedDecimal_1.default)(subTotal + salesTaxTotal);
        console.log(`Grand Total: ${grandTotal}`);
        console.log('Completed running Feature 3');
        return { subTotal: subTotal, salesTaxTotal: salesTaxTotal, grandTotal: grandTotal, itemsCount: myCart.length, items: myCart };
    }
    catch (error) {
        console.log('Error occured in feature 2:', error);
    }
    console.log('###############################');
});
exports.default = feature3;
