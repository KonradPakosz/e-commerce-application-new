import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'

const isSingleProductPage = (product, singleProductPage) => {
    if (singleProductPage) { return (product.description) }
    else {
        return (product.description.substring(0, 100))
    }
}

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f, // default value of function
    run = undefined, // default value of undefined
    singleProductPage = false
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mr-2 mt-2 mb-2">
                        View Product
                </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showCartButton = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-success mt-2 mb-2">
                    Add to Card
                </button>
            ))
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (

            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
                <span className="badge badge-danger badge-pill">Out of Stock</span>
            )
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className=" input-group-prepend">
                    <span className="input-group-text">Adjust product quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }

    return (
        <div className="card card-borders">
            <div className="card-body">
                {shouldRedirect(redirect)}

                <h5 className="card-title card-title-color" >{product.name}</h5>
                <ShowImage item={product} url="product" />
                <p className="card-text card-description">
                    {isSingleProductPage(product, singleProductPage)}...
                </p>
            </div>
            <ul class="list-group list-group-flush" >
                <li className="list-group-item">
                    <b>€{product.price}</b>
                </li>
                <li className="list-group-item list-group-category">
                    Category: {product.category && product.category.name}
                </li>
                <li className="list-group-item disabled">
                    Added {moment(product.createdAt).fromNow()}
                </li>
            </ul>
            <div className="card-body">{showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showCartButton(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card;