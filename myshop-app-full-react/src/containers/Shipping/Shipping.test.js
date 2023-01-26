import { render, screen, } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Shipping from '../Shipping/ShippingProducts'


it('renders the comp properly', () => {
    expect(Shipping).toBeTruthy();
});