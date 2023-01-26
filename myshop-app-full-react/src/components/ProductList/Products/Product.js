import React from 'react';
import { Link } from 'react-router-dom';
import UpdateQuantity from '../../shared/Cart/UpdateQuantity';

const Product = ({product}) => {
    
    return (
        <div className="product" id={`product${product.id}`}>
            <div className="image-box">
                <div className={`images${product.id}`}><img src={product.imageURLs[0].thumbnail} alt={product.imageURLs[0].altText} width="250" height="250" id={`thumbnail${product.id}`} />
                </div>
            </div>
            <div className="text-box">
                <h2 className="item"><Link to={`./${product.id}`} id={`productName${product.id}`}>{product.productName}</Link></h2>
                <h3 className="price" id={`productPrice${product.id}`}>Rs.{product.price}</h3>
                <UpdateQuantity product={product}/>
            </div>
        </div>
    )
}

export default Product;
