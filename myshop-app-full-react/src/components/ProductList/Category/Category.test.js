import React from 'react';
import Category from './Category'
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer'

describe("Category Component", () => {
    it('renders the component properly', () => {
        const divEl = document.createElement('div');
        ReactDom.render(<BrowserRouter><Category/></BrowserRouter>, divEl);
    });

    it('should have products as text', () => {
        render(<BrowserRouter><Category/></BrowserRouter>);
        const productsText = screen.getByText('Products');
        expect(productsText).toBeInTheDocument();
    });

    it('should have categories as text', () => {
        render(<BrowserRouter><Category/></BrowserRouter>);
        const categoriesText = screen.getByText('Categories');
        expect(categoriesText).toBeInTheDocument();
    });

    it('should have view all as text', () => {
        render(<BrowserRouter><Category/></BrowserRouter>);
        const viewAllText = screen.getByText('View All');
        expect(viewAllText).toBeInTheDocument();
    });

    it('should display categories correctly', () => {
        render(<BrowserRouter><Category/></BrowserRouter>);
        const categoryList = screen.getByTestId('categoryListEl');
        expect(categoryList).toHaveTextContent('Electronics & Offices ›LaptopsMobilesOffice ChairClothing,Shoes & AccessoriesHome, Furniture & AppliancesToys & Video GameMovies Music & BooksG & aFood,Household & PetsPharmacy & HealthcareBeauty & JwelerySports,Fitness & OutdoorsAuto,Tyres & Industrial');
    });

    it('should have right Category comp snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Category/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
})