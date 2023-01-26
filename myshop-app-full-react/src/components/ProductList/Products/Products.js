import fetchUrls from '../../../config/config.json';
import Product from './Product';
import useFetch from '../../../config/useFetch';
import queries from '../productListConfig/productList.json';

const Products = ({ urlParam  }) => {
  if(!urlParam){
    urlParam = "/?"+queries.start0to9;
  }
  const products = useFetch(fetchUrls.productApi + urlParam, "GET");

  let productList = null;
  if (products.apiData !== null) {
    productList = products.apiData.map((product) => {
      return (<Product product={product} key={product.id}></Product>)
    });
  }
  
  return (
    <div className="listing-section" id="listingSection">

      {productList && productList.length > 0 ?
        productList
        :
        <div>
          No Products Found
        </div>
      }
    </div>
  )
}

export default Products;