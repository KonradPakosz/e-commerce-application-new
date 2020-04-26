import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import { prices } from "./fixedPrices"
import RadioBox from './RadioBox'
import Search from './Search'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        console.log("init");
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });
    };

    const loadFilteredResults = newFilters => {
        console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button className="btn btn-primary mb-5" onClick={loadMore}> Load More Results</button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        console.log(filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters);
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    }

    return (
        <Layout title="Shop Page" description="Seach for your favourite games" className="container-fluid">
            <Search />
            <div className="row">
                <div className="container-checkbox">
                    <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                </div>
            </div>
            <div className="row ">
                <div className="col-2 radio-box-margin">
                    <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")} />
                </div>
                <div className="col-10">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}

                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
};

export default Shop