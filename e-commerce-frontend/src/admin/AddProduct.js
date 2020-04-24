import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProuct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProuct,
        redirectToProfile,
        formData
    } = values

    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] :event.target.value //grab value unless its an image
        formData.set(name,value)
        setValues({...values, [name]: value})
    }

    const newPostForm = () => (
        <form className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-primary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    value={name}>
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange('description')}
                    type="text"
                    className="form-control"
                    value={name}>
                </textarea>
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange('name')}
                    type="number"
                    className="form-control"
                    value={price}>
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')}className="form-control">
                        <option value="Adventure">Adventure</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('category')}className="form-control">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange('quantity')}
                    type="number"
                    className="form-control"
                    value={quantity}>
                </input>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    return (
        <Layout
            title="Add a new category"
            description={`Hello ${user.name}! Add a new product here`}>
            <div class="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct;