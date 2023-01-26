import React from 'react';
import { Link } from 'react-router-dom';
import PageLink from './PageLink';
import paths from '../productListConfig/productList.json';

const PageNumber = () => {

  let pageLinks = [];
  for (let i = 3; i < 11; i++) {
    pageLinks.push(JSON.stringify(i));
  }
  pageLinks.push("Next");
  pageLinks.push("»");
  const pages = pageLinks.map((page, index) => {
    return <PageLink pageLinks={page} key={index} />
  });


  return (
    <>
      <div className="center">
        <div className="pagination1" data-testid="pageNumberEl">
          <Link to={paths.products0to9}>«</Link>
          <Link to={paths.products0to9}>First</Link>
          <Link to={paths.products0to9}>Previous</Link>
          <Link to={paths.products0to9} id="firstPage">1</Link>
          <Link to={paths.products9to12} className="p2" id="secondPage">2</Link>
          {pages}
        </div>
      </div>
    </>

  )
}

export default PageNumber;