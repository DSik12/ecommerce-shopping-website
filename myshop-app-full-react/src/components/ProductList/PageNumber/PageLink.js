import React from 'react';
import { Link } from 'react-router-dom';

const PageLink = (pages) => {

    return (
        <Link to="/products">{pages.pageLinks}</Link>
    )
}

export default PageLink;