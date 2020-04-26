import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

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
            <Search/>
            <h1 className="mb-4 home-header">New Arrivals</h1>
            <div className="row">
                
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product}/>
                    </div> 
                ))}
            </div>
            <h1 className="mb-4 home-header">Best Sellers</h1>
            <div className="row">
                {productsBySold.map((product, i) => (
                    <div key={i} className="col-3 mb-4">
                        <Card product={product}/>
                    </div>
                ))}
            </div>
        </Layout>
    )
};

export default Home;