import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './apiCore'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });
    };

    useEffect(() => {
        init()
    }, [])

    return(
        <Layout title="Shop Page" description="Seach for your favourite games" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    
                </div>
                <div className="col-8">
                    main section
                </div>
            </div>
        </Layout>
    )
};

export default Shop