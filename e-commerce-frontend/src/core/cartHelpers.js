export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })
        // to make sure we don't make duplicate items I am making a method
        // which will let me update the count of items in cart
        // remove duplicates
        //build an Array from new Set and turn it back into array using Array.from
        //new Set will only allow unique values in, if the loop tries to add the same
        // value it will be ignored
        // map again to return the product from cart

        cart = Array.from(new Set(cart.map((p) => (p._id) ))).map(id => {
            return cart.find(p => p._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next();
    }
}

export const itemTotal = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}

export const getCart = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export const updateItem = (productId, count) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    
    cart.map((product, i) => {
        if(product._id === productId) {
            cart[i].count = count
        }
    })

    localStorage.setItem("cart", JSON.stringify(cart))
    }
}

