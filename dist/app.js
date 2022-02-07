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
const express_1 = __importDefault(require("express"));
const feature1_1 = __importDefault(require("./feature1"));
const app = (0, express_1.default)();
const port = 9999;
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send("Hello from Vineela!");
});
app.get('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myCart = yield (0, feature1_1.default)();
        return res.json({
            success: true,
            data: myCart
        });
    }
    catch (error) {
        return res.json({
            success: false,
            error: error
        });
    }
}));
(0, feature1_1.default)();
