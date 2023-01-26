import React, { useReducer } from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import Footer from './components/shared/Footer/Footer.js';
import Header from './components/shared/Header/Header.js';
import { CartQuantityContext, reducer, initialState } from './components/shared/ReducerContextUtility/ReducerContextUtility';

import "../src/containers/Payment/Payment.scss";

import { routes } from './routes/AppRoutes';

function App() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <CartQuantityContext.Provider
      value={{ countState: count, countDispatch: dispatch }}
    >
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            {routes}
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartQuantityContext.Provider>
  );
}

export default App;
