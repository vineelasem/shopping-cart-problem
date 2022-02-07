import getCart from "./getCart";
import toFixedDecimal from "./utils/toFixedDecimal";


const taxRate = 0.0825;

const feature2 = async () => {
    console.log('Running Feature 2')

    try
    {
        const myCart = await getCart();
        const subTotal = myCart.map((item) => item.price).reduce((total, itemPrice) => toFixedDecimal(itemPrice + total), 0);
        console.log(`Sub Total: ${subTotal}`)
        const salesTaxTotal = toFixedDecimal(subTotal * taxRate);
        console.log(`SalesTax Total: ${salesTaxTotal}`);
        const grandTotal = toFixedDecimal(subTotal + salesTaxTotal);
        console.log(`Grand Total: ${grandTotal}`);
        console.log('Completed running Feature 2')

        return {subTotal: subTotal, salesTaxTotal: salesTaxTotal, grandTotal: grandTotal, itemsCount: myCart.length, items: myCart}
    }
    catch(error){
        console.log('Error occured in feature 2:',error)
    }
    console.log('###############################')
}

export default feature2;