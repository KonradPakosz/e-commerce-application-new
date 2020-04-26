import React from 'react';
import {API} from '../config';

const ShowImage = ({item, url}) => (
    <div className="product-img">
        <img 
            className="card-img-top" 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit:'cover'}} />
    </div>
)

export default ShowImage;