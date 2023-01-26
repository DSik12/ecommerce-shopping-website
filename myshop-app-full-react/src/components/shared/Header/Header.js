import React from 'react'
import { Link } from 'react-router-dom';
import HamBurgerMenu from './HamburgerMenu/HamBurgerMenu';
import './Header.scss';

import Menu from './Menu/Menu';
import Searchbar from './Searchbar';
const Header = (props) => {


  return (
    <header className="headerWrapper">
        <Link to='/' className="logo">MyShop</Link>
        <section className="search">
          <Searchbar/>
        </section>  
        <section className="wrapper">
          <HamBurgerMenu />
        </section>
        <nav className="primaryNav">
            <Menu />
          </nav>
      </header>
  )
}

export default Header