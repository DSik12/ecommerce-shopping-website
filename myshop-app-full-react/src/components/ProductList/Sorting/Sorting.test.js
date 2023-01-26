import React from 'react';
import Sorting from './Sorting';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer'


describe("Sorting Component", () => {
    
    it('renders the comp properly', () => {
        const divEl = document.createElement('div');
        ReactDOM.render(<Sorting />, divEl);

    });

    it('should have filter as text', () => {
        render(<Sorting />);
        const filterText = screen.getByText('Filter');
        expect(filterText).toBeInTheDocument();
    });

    it('should have sort as text', () => {
        render(<Sorting />);
        const sortText = screen.getByText('Sort');
        expect(sortText).toBeInTheDocument();
    });

    it('should update on onChange event in sorting event', () => {
        render(<Sorting />);
        //mock fire the event
        const sortingTypes = screen.getByTestId('sortingTypes');
        fireEvent.change(sortingTypes, { target: { value: "" } });
        expect(sortingTypes.value).toBe("");
    })

    it('should have component snapshot', () => {
        const tree = renderer.create(<Sorting/>);
        expect(tree).toMatchSnapshot();
    })


})