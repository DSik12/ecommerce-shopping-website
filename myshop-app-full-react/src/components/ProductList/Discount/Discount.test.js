import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Discount from '../../../containers/Discount';

describe("Discount Component", () => {
    it('renders the component properly', () => {
        const sectionEl = document.createElement('section');
        ReactDom.render(<BrowserRouter><Discount/></BrowserRouter>, sectionEl);
    });

    it('should have Filter as text', () => {
        render(<BrowserRouter><Discount/></BrowserRouter>);
        const filterText = screen.getByText('Filter');
        expect(filterText).toBeInTheDocument();
    });

    it('should have DISCOUNT as text', () => {
        render(<BrowserRouter><Discount/></BrowserRouter>);
        const discountText = screen.getByText('DISCOUNT');
        expect(discountText).toBeInTheDocument();
    });

    it('should display discount filters correctly', () => {
        document.body.innerHTML = `
        <span class="inFilter">
            <input type="checkbox" name="check" class='disable' id="Discount1" />
            <label htmlFor="Discount1">10% or more</label>
        </span>
        <span class="inFilter">
            <input type="checkbox" name="check" class='disable' id="Discount2" />
            <label htmlFor="Discount2">20% or more</label>
        </span>
        `;
        require('../../../containers/Discount.js');
    });

    it('should have right Discount component snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Discount/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});
