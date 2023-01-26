import React from 'react';
import ReactDOM from 'react-dom'; 
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import PageNumber from './PageNumber';

describe('Pagination Component', () =>{
    it('renders the component properly', () =>{
        const divEl = document.createElement('div');
        ReactDOM.render(<BrowserRouter><PageNumber/></BrowserRouter>, divEl);
    });

    it('should have page number as text', () => {
        render(<BrowserRouter><PageNumber/></BrowserRouter>);
        const firstText = screen.getByText('First');
        expect(firstText).toBeInTheDocument();
    });

    it('should have page numbers as text', () => {
        render(<BrowserRouter><PageNumber/></BrowserRouter>);
        const previousText = screen.getByText('Previous');
        expect(previousText).toBeInTheDocument();
    });

    it('should display pagination correctly', () => {
        render(<BrowserRouter><PageNumber/></BrowserRouter>);
        const pageNumberEl = screen.getByTestId('pageNumberEl');
        expect(pageNumberEl).toHaveTextContent('«FirstPrevious12345678910Next»');
    });

    it('should have component snapshot', () => {
        const tree = renderer.create(<BrowserRouter><PageNumber /></BrowserRouter>);
        expect(tree).toMatchSnapshot();
    })
})