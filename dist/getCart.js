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
const node_fs_1 = __importDefault(require("node:fs"));
const axios_1 = __importDefault(require("axios"));
const getCart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.get('https://fakestoreapi.com/products');
        console.log(result.data);
        return yield JSON.parse(node_fs_1.default.readFileSync('/Users/Vineela/Documents/demoprojects/HEB/src/assets/cart.json').toString());
    }
    catch (error) {
        throw new Error();
    }
});
exports.default = getCart;
