import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./CarouselUtility";
import UpdateQuantity from "../../shared/Cart/UpdateQuantity";
import { Link } from "react-router-dom";
import "./CarouselStyle.scss";

// Idividual Product Rendering part for Home Page
let LatestProduct = ({ product }) => {
  const imageUrls = product.imageURLs;
  const productId = product.id;
  const productPrice = product.price;
  const productName = product.productName;

  let productTileData = imageUrls.map((imageUrlData) => {
    return (
      <Item>
        <img
          src={`${imageUrlData.thumbnail}`}
          alt={`${imageUrlData.altText}`}
          width="225"
          height="225"
          key={productId}
          id={`thumbnail${productId}`}
        />
      </Item>
    );
  });

  return (
    <div className="product" id={`product${productId}`}>
      <div className="imageBox">
        <div className={`images${productId}`}>
          <Carousel itemsToShow={1}>{productTileData}</Carousel>
        </div>
      </div>
      <div className="text-box">
        <h2 className="item">
          <Link to={`./products/${productId}`} id={`productName${productId}`}>
            {productName}
          </Link>
        </h2>
        <h3 className="price" id={`productPrice${productId}`}>
          Rs.{productPrice}
        </h3>
        {/* Add to Cart functionality Button */}
        <UpdateQuantity product={product} />
      </div>
    </div>
  );
};

export default LatestProduct;
