import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'

const Home = () => {
    const [productsBySold, setProductsBySold] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySold = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySold(data)
            };
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
           }
         });
    }

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySold();
    }, [])

    return(
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySold.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        </Layout>
    )
};

export default Home;