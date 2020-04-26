import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getCart, removeItem} from './cartHelpers'
import Card from './Card'
import {Link} from 'react-router-dom'

const Checkout = ({products}) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    return <div>
        <h2>Total: €{getTotal()}</h2>
    </div>
}

export default Checkout