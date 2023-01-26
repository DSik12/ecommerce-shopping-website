import React from 'react';
import { NavLink } from 'react-router-dom';
const MenuItem = ({name,url}) => {
  return (
    <li><NavLink to={url} className="menuItem" activeclassname="active">{name} | </NavLink></li>
  )
}

export default MenuItem