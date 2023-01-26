import React from 'react'
import './ProductDetails.scss';
import UpdateQuantity from '../shared/Cart/UpdateQuantity';

const Description = (props) => {
    return (
        <ul>
            <div id="description">
                <div className="postSection">
                    <h1 id="productName" >{props.productItems.productName}</h1>
                    <p>
                        {props.productItems.productDescription}
                    </p>
                    <div className="productPrice" id="productPrice"><h3>
                        Rs. {props.productItems.price}</h3>
                    </div>
                    < UpdateQuantity product={props.productItems} />
                </div>
            </div>
        </ul>
    )
}

export default Description;