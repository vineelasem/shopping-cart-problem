import getCart from "./getCart";
import getCoupons from "./getCoupons";
import Item from "./types/Item";
import toFixedDecimal from "./utils/toFixedDecimal";

const taxRate = 0.0825;

const feature4 = async () => {
    console.log('Running Feature 4')

    try
    {
        const myCartPromise = getCart();
        const myCouponsPromise = getCoupons();

        const results = await Promise.all([myCartPromise,myCouponsPromise]);
        const myCart = results[0];
        const myCoupons = results[1];

        const myCartWithDiscounts = myCart.map((item: Item) => {
            //Find if coupon exist for the current SKU
            const coupon = myCoupons.find((coupon) => coupon.appliedSku === item.sku)
            if (coupon){
                console.log(`Coupon found and applying for item sku: ${item.sku}, Original Price: ${item.price}, Discount: ${coupon.discountPrice}, New Price ${ toFixedDecimal(item.price - coupon.discountPrice)}`)
                return {...item, price: toFixedDecimal(item.price - coupon.discountPrice)}
            }
            else {
                return item
            }
        });
    
        //console.log(myCartWithDiscounts)

        const subTotal = myCartWithDiscounts.map((item) => (item.price)).reduce((total, itemPrice) => toFixedDecimal(itemPrice + total), 0);
        const subTotalWithSalesTax: number = myCartWithDiscounts.filter((item) => item.isTaxable === true).map((totalprice: { price: number; }) => totalprice.price).reduce((total, itemprice) => toFixedDecimal(itemprice + total), 0);
        const salesTaxTotal = toFixedDecimal(subTotalWithSalesTax * taxRate);
        console.log(`Sub Total: ${subTotal}`)
        console.log(`Sales Tax Total: ${salesTaxTotal}`)
        const grandTotal = toFixedDecimal(subTotal + salesTaxTotal);
        console.log(`Grand Total: ${grandTotal}`);
        
        console.log('Completed running Feature 4');  

        return {subTotal: subTotal, salesTaxTotal: salesTaxTotal, grandTotal: grandTotal, itemsCount: myCart.length, items: myCartWithDiscounts}
    }
    catch(error){
        console.log('Error occured in feature 2:',error)
    }
    console.log('###############################')
}

export default feature4