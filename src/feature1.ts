import getCart from "./getCart";
import toFixedDecimal from "./utils/toFixedDecimal";

const feature1 = async () => {
    console.log('Running Feature 1')    
    try
    {
        const myCart = await getCart();
        const subTotal = myCart.map((item) => item.price).reduce((total, itemPrice) => toFixedDecimal(itemPrice + total), 0);
        const grandTotal = toFixedDecimal(subTotal)
        console.log(`GrandTotal: ${grandTotal}`)
        console.log('Completed running Feature 1')

        return {subTotal: subTotal, salesTaxTotal: 0.00, grandTotal: grandTotal, itemsCount: myCart.length, items: myCart}
    }
    catch(error){
        console.log('Error occured in feature 1:',error)
    }
    
    console.log('###############################')
}

export default feature1;