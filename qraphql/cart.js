/**
 * Class Cart
 */
module.exports= 
class Cart{
    constructor(){
        this.products = [];//array of all products
        this.total_price = 0;
    }
    addProduct(product){
        this.products.push(product);
        this.total_price += product.price; 

    }
    deleteProduct(product){
        this.products.pop(product);
        this.total_price-=product.price;
    }
}
