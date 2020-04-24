import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/layout';
import {signin} from '../auth';

const Signin = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault() //so the browser does not reload
        setValues({ ...values, error: false, loading:true })
        signin({email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                setValues({
                    ...values,
                    redirectToReferrer: true
                });
            }
        })
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div 
            className="alert alert-danger" 
            style={{display: error ? '' : 'none'}}>
            {error}
        </div>)

    const showLoading= () => (
        loading && (<div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            return <Redirect to="/"></Redirect>;
        }
    }

    return (
        <Layout 
            title="Signin Page" 
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
};

export default Signin;