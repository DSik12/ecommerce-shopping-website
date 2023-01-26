import React from 'react';
import { Link } from 'react-router-dom';
import electronics from '../../../assets/images/electronics.png';

import CategoryList from './CategoryList';
import data from '../productListConfig/productList.json';

import { categoryList } from '../productListConfig/productListStatic';


const Category = (props) => {

    const filterProductsCategory = (category) => {
        const search = window.location.search;
        if (category === 1) {

            if (search) {
                const existingQuery = search.substring(1, search.length);
                if (!existingQuery.includes(data.laptop) && !existingQuery.includes(data.mobile)) {
                    const productApi = `${existingQuery}&${data.mobile}`;
                    props.navigate(data.products, productApi);
                }
                else {
                    const productApi = existingQuery.replace(/q=laptop/, data.mobile);
                    props.navigate(data.products, productApi);
                }
            }
            else {
                const productApi = data.mobile;
                props.navigate(data.products, productApi)
            }

        } else {
            if (search) {
                const existingQuery = search.substring(1, search.length);
                if (!existingQuery.includes(data.mobile) && !existingQuery.includes(data.laptop)) {
                    const productApi = `${existingQuery}&${data.laptop}`;
                    props.navigate(data.products, productApi);
                }
                else {
                    const productApi = existingQuery.replace(/q=Smartphones/, data.laptop);
                    props.navigate(data.products, productApi);
                }
            }
            else {
                props.navigate(data.products, data.laptop);
            }

        }

    };
    const handleFilterLaptop = () => {
        filterProductsCategory(2);
    }
    const handleFilterMobile = () => {
        filterProductsCategory(1);
    }

    const productCategoryList = categoryList.map((category, index) => {
        return <CategoryList category={category.category} subCategory={category.subCategory} spanEle={category.spanEle} key={index} />
    })

    return (
        <>
            <h3>Products</h3>
            <nav>
                <div className="categoriesHeadingWrapper">
                    <span className="categoriesHeading"><strong>Categories</strong> </span>
                    <span className="viewAll">
                        <Link to={data.products0to9} id="viewAll">View All</Link></span>
                </div>
                <hr />
                <ul data-testid="categoryListEl">
                    <li className="dropright">
                        <Link to="/"><span id="logos"><img src={electronics} alt="logo" width="32" height="32" /></span>Electronics &amp; Offices <span id="arrow"><strong>›</strong></span></Link>
                        <ul>
                            <li><div id="filterLaptop" onClick={handleFilterLaptop}>Laptops</div></li>
                            <li><div id="filterMobile" onClick={handleFilterMobile}>Mobiles</div></li>
                            <li><div to="/">Office Chair</div></li>
                        </ul>
                    </li>

                    {productCategoryList}

                </ul>
                <hr />
            </nav>
        </>
    )
}

export default Category

