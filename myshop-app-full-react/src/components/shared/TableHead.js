import React from 'react'
import "./../FullCart/FullCart.scss";

const TableHead = () => {
    return (
        <>
            <caption className="shopping">Shopping Cart</caption>
            <thead>
                <tr className="full-cart-th">
                    {/* for thumbnail image */}
                    <th />
                    <th>Item(s)</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="total">Total</th>
                </tr>
            </thead>
        </>
    )
}

export default TableHead