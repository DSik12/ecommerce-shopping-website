import React, { useState } from 'react';

const SlideshowProducts = (props) => {
    const [imageIndex, setIndex] = useState(0);

    const handleClickImg = (imgIndexOnClick) => {
        setIndex(prevImageIndex => prevImageIndex = imgIndexOnClick);
    }

    const handlePrevBtn = () => {
        if (imageIndex <= 0) {
            setIndex(prevImageIndex => prevImageIndex = 3);
        } else {
            setIndex(prevImageIndex => prevImageIndex - 1);
        }
    }

    const handleNextBtn = () => {
        if (imageIndex >= props.items.imageURLs.length - 1) {
            setIndex(prevImageIndex => prevImageIndex = 0);
        } else {
            setIndex(nextIndex => nextIndex + 1);
        }
    }

    return (
        <div>
            <div className='sliderProductDetails' id={`image${props.items.id}`}>
                <img src={props.items.imageURLs[imageIndex].url} alt={props.items.imageURLs[imageIndex].altText} />
            </div>
            <div>
                <button className="prevBtn" onClick={handlePrevBtn}>
                    ❮
                </button>
                <button className="nextBtn" onClick={handleNextBtn}>
                    ❯
                </button>
            </div>
            <div className="thumbnailWrapper" id="thumbnailWrapper">
                <span className="thumbnailImg" >
                    <img src={props.items.imageURLs[0].thumbnail} alt={props.items.imageURLs[0].altText} onClick={() => handleClickImg(0)} />
                </span>
                <span className="thumbnailImg" >
                    <img src={props.items.imageURLs[1].thumbnail} alt={props.items.imageURLs[1].altText} onClick={() => handleClickImg(1)} />
                </span>
                <span className="thumbnailImg" >
                    <img src={props.items.imageURLs[2].thumbnail} alt={props.items.imageURLs[2].altText} onClick={() => handleClickImg(2)} />
                </span>
                <span className="thumbnailImg" >
                    <img src={props.items.imageURLs[3].thumbnail} alt={props.items.imageURLs[3].altText} onClick={() => handleClickImg(3)} />
                </span>
            </div>
        </div>
    )
}

export default SlideshowProducts; 