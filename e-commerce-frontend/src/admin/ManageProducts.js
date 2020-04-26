import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

const ManageProducts = () => {


    return(
        <Layout
        title="Manage Products"
        description={`CRUD your products ;)`}
        className="container-fluid">
            
            <h2 className="mb-4">Manage Products</h2>
        </Layout>
    )
}

export default ManageProducts