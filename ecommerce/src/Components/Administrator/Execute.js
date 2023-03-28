export function executeFullNamForProductItem(product, productItem) {
    let config = productItem.productConfigurations;
    let value = [];
    config.forEach(c => {
        value.push(c.variationOption.value);
    })
    value = value.sort((a, b) => a.length - b.length);
    let name = "";
    value.forEach(v => name = name + " " + v);
    return product.name + " " + name;
}

export function calSum(price, qty){
    return price * qty
 }