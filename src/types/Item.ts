interface Item {
    itemName: string
    sku: string
    isTaxable: boolean
    ownBrand: boolean
    price: number
    quantity?: number
}

export default Item;