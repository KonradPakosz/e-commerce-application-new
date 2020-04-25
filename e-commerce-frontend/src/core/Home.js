import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'

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
        <Layout title="Home Page" description="Node React E-commerce App">
        {JSON.stringify(productsByArrival)};
        <hr/>
        {JSON.stringify(productsBySold)}
        </Layout>
    )
};

export default Home;