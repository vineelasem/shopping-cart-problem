import getCart from "./getCart";
import toFixedDecimal from "./utils/toFixedDecimal";

const taxRate = 0.0825;

const feature3 = async () => {
    console.log('Running Feature 3')

    try
    {
        const myCart = await getCart();
        const subTotal = myCart.map((item) => item.price).reduce((total, itemprice) => toFixedDecimal(itemprice + total), 0);
        const subTotalWithSalesTax = myCart.filter((item) => item.isTaxable === true).map((item) => item.price).reduce((total, itemPrice) => toFixedDecimal(itemPrice + total),0);
        const salesTaxTotal = toFixedDecimal(subTotalWithSalesTax * taxRate);
        console.log(`Sub Total: ${subTotal}`)
        console.log(`Sales Tax Total: ${salesTaxTotal}`)
        const grandTotal = toFixedDecimal(subTotal + salesTaxTotal);
        console.log(`Grand Total: ${grandTotal}`);
        console.log('Completed running Feature 3')

        return {subTotal: subTotal, salesTaxTotal: salesTaxTotal, grandTotal: grandTotal, itemsCount: myCart.length, items: myCart}
    }
    catch(error){
        console.log('Error occured in feature 2:',error)
    }
    console.log('###############################')
}

export default feature3;