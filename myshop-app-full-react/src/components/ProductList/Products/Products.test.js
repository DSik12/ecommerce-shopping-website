import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Products from './Products.js';

describe("Products Component", () => {
    it('renders the component properly', () => {
        const divEl = document.createElement('div');
        ReactDom.render(<BrowserRouter><Products/></BrowserRouter>, divEl);
    });

    it('should display products correctly', () => {
        document.body.innerHTML = `
        <div className="product" id="product1">
            <div className="image-box">
                <div className="image1"><img src="image1.png" alt="product1" width="250" height="250" id="thumbnail1" />
                </div>
            </div>
            <div className="text-box">
                <h2 className="item"><Link to="./product1" id="productName1">Apple-iPhone-13-pro-smartphone</Link></h2>
                <h3 className="price" id="productPrice1">Rs.84900</h3>
                <UpdateQuantity product="product"/>
            </div>
        </div>
        <div className="product" id="product2">
            <div className="image-box">
                <div className="image2"><img src="image2.png" alt="product2" width="250" height="250" id="thumbnail2" />
                </div>
            </div>
            <div className="text-box">
                <h2 className="item"><Link to="./product2" id="productName2">Samsung Galaxys S21 FE 5G</Link></h2>
                <h3 className="price" id="productPrice2">Rs.54600</h3>
                <UpdateQuantity product="product"/>
            </div>
        </div>
        `;
        require('./Products.js');
    });

    it('should have right Products component snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Products/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});