import Coupon from "./types/Coupon";
import fs from 'node:fs';

const getCoupons = async (): Promise<Coupon[]> => {
    try {
        return await JSON.parse(fs.readFileSync('/Users/Vineela/Documents/demoprojects/HEB/src/assets/coupon.json').toString());
    }
    catch(error){
        throw new Error();
    }
}

export default getCoupons;