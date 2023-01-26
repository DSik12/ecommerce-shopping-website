import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Products from './Products/Products';
import { useState } from 'react';

const ProductsRender = () => {
    const {search} = useLocation();
    const [url, setUrl] = useState(search);
    useEffect(() => {
        return (() => {
            setUrl(window.location.search);
        })

    }, [search]);
    return (
        <Products urlParam={url}/>
    )
}

export default ProductsRender;