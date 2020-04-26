import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {getProducts, deleteProduct} from './apiAdmin'
import Search from '../core/Search'

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])


    return(
        <Layout
        title="Manage Products"
        description={`CRUD your products ;)`}
        className="container-fluid">
            
            <h2 className="mb-4">Manage Products</h2>
            <Search/>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total products: {products.length} </h2>
                    <div className="list-group">
                        {products.map((p,i) => (
                            <li key={i} className="list-group-item">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge badge-danger badge-pill">
                                    Delete
                                </span>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts