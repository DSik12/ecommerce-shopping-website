import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../productListConfig/productListStatic';

const CategoryList = (itemList) => {
    
    return (
        <>
            <li className="dropright">
                <Link to="/products"><span id="logos"><img src={itemList.category} alt="logo" width="32" height="32" /></span>{itemList.spanEle[0]} &amp; {itemList.spanEle[1]}

                    {
                        categories.includes(JSON.stringify(itemList.category)) ?
                            <span>
                                <span id="arrow">
                                    <strong>›</strong>
                                </span>
                                <ul>
                                    <li><Link to="/">{itemList.subCategory[0]}</Link></li>
                                    <li><Link to="/">{itemList.subCategory[1]}</Link></li>
                                    <li><Link to="/">{itemList.subCategory[2]}</Link></li>
                                </ul>
                            </span>
                            :
                            <span></span>

                    }
                </Link>
            </li>

        </>
    )
}

export default CategoryList;