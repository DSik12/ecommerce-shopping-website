import { render,fireEvent } from '@testing-library/react';
import AddressCheckout from './AddressCheckout';
import {BrowserRouter} from 'react-router-dom';
import {screen} from '@testing-library/dom'

describe('AddressCheckout', () => {

    it('Should be true', () => {
        const test = true;
        expect(test).toBe(true);
    });


    it('renders welcome to unit testing text', () => {
        render(
            <BrowserRouter>
              <AddressCheckout/>
            </BrowserRouter>
          );
        const welcomeElement = screen.getByText("Checkout");
        expect(welcomeElement).toBeInTheDocument();
      });

      it("Check if firstName field exists", () => {
        render(
          <BrowserRouter>
            <AddressCheckout/>
          </BrowserRouter>
        );
        const inputEl = screen.getByTestId("firstName");
        expect(inputEl).toBeInTheDocument();
      });

      it("Checking for correct Name (as Name cant be without string literal)", () => {
        render(
          <BrowserRouter>
            <AddressCheckout/>
          </BrowserRouter>
        );
        const name = screen.getByTestId("firstName");
        fireEvent.change(name, { target: { value: 98788888 } });
        expect(name.value).toBe(98888888);
      });

      it("Checking for correct Name", () => {
        render(
          <BrowserRouter>
            <AddressCheckout/>
          </BrowserRouter>
        );
        const name = screen.getByTestId("firstName");
        fireEvent.change(name, { target: { value: "Shreya" } });
        expect(name.value).toBe("Shreya");
      });


      it("Checking for select button", () => {
        render(
          <BrowserRouter>
            <AddressCheckout/>
          </BrowserRouter>
        );
        const inputEl = screen.getByTestId("state");
        const selectedValue=fireEvent.change(inputEl);
        expect(selectedValue).toBe(true);
        expect(inputEl.value).toBe("Karnataka");
      });

      
      it("Checking for length of pin", () => {
        render(
          <BrowserRouter>
            <AddressCheckout/>
          </BrowserRouter>
        );
        const inputEl = screen.getByTestId("pin");
        fireEvent.change(inputEl, { target: { value: "123" } });
        expect(inputEl.value.length).toBe(3);
      });


    

    
      






      // test case
    it('renders app component', () => {
        expect(AddressCheckout).toBeTruthy();
    });

    

    // it('renders the comp properly', () => {
    //     const divEl = document.createElement('div'); 
    //     ReactDOM.render(<AddressCheckout />, divEl);
    //   });

    // // test case #2 
    // it('should have an input with Company Name as placeholder', ()=>{
    //     render(<AddressCheckout />);
    //     const placeHolderText = screen.queryByPlaceholderText('First name');
    //     // if the placeholder is not matching, this will fail
    //     expect(placeHolderText).toBeTruthy();
    //   });

});