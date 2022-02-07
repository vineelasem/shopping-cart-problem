import Item from "./types/Item";
import fs from 'node:fs';

const getCart = async (): Promise<Item[]> => {
    try 
    {
        return await JSON.parse(fs.readFileSync('/Users/Vineela/Documents/demoprojects/HEB/src/assets/cart.json').toString());
    }
    catch(error){
        throw new Error();
    }
}

export default getCart