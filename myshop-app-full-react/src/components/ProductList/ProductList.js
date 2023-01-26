import React from 'react';
import Category from './Category/Category';
import Discount from '../../containers/Discount';
import PageNumber from './PageNumber/PageNumber';
import { useNavigateParams } from '../../util/useNavigateParams';
import Sorting from './Sorting/Sorting';
import ProductsRender from './ProductsRender'
import '../ProductList/Category/Category.scss';
import '../ProductList/Discount/Discount.scss';
import '../ProductList/PageNumber/PageNumber.scss';
import '../ProductList/Products/Product.scss';
import '../ProductList/Sorting/Sorting.scss';

const ProductList = () => {
  const navigate = useNavigateParams();
  return (
    <>
      <div className='productList'>

        <aside className='sidebar'>

          <Category navigate={navigate} />

          <Discount navigate={navigate} />

        </aside>

        <div className='products'>

          <Sorting navigate={navigate} />

          <ProductsRender />

        </div>

      </div>

      <PageNumber />
    </>
  )
}

export default ProductList