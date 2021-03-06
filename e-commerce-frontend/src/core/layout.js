import React from 'react';
import Menu from './Menu';
import "../styles.css";

const Layout = ({title = 'Title', description = 'Description', className, children}) => (
    <div className="background-picture">
        <Menu />
        <div className="jumbotron">
            <h1>{title}</h1>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);
export default Layout;