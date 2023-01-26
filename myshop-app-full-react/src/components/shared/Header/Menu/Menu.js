import MenuItem from "./MenuItem";
import MiniCart from "../Minicart/MiniCart"


const Menu = () => {
    // the menu items to be displayed
    const primaryMenus = [
        { name: 'HOME', url: '/' },
        { name: 'PRODUCTS', url: '/products' },
        { name: 'ABOUT', url: '/about' },
        { name: 'CONTACT', url: '/contact' }
    ];

    let menus = null;
    menus = primaryMenus.map((primaryMenu, index) => {
        return (
            <MenuItem {...primaryMenu} key={index} />
        )
    })
    

    return (
        <ul className="navigation">
            {menus}
            <li className="miniCart">
             
             <MiniCart/>
           </li>
        </ul>
    )
}
export default Menu;