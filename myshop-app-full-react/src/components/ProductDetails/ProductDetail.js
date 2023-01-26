import Description from './ProductDescription';
import './ProductDetails.scss';
import SlideshowProducts from './ProductSlides';
import useFetch from '../../config/useFetch'
import { useParams } from 'react-router-dom'
import fetchUrls from '../../config/config.json'

const ProductDetails = () => {
    const myParams = useParams();
    const products = useFetch(`${fetchUrls.productApi}?id=${myParams.id}`)
    let productItem = null;
    if (products.apiData !== null) {
        productItem = products.apiData.map((item) => {
            return (<div className="container" key={item} >
                <div className="slideshow-container">
                    <SlideshowProducts items={item} />
                </div>
                <Description productItems={item} />
            </div>)
        });
    }
    return (
        <div className="slideshow-container" id="slideshow-container">
            {productItem && productItem.length > 0 ?
                productItem
                :
                <div className='text-center'>
                    <h1>No Products Found</h1>
                </div>
            }
        </div>
    )
}


export default ProductDetails;



