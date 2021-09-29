import React from "react";
import "./Header.css"
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";


function Header(){

    const [{basket,user},dispatch]=useStateValue();
    const handleAuthentication=()=>{
        if(user){
            auth.signOut();
        }
    }


    return <>



    <div className="header">
        <Link to="/">
        <img className="header_logo"
         src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
        </Link>
        

        <div className="header_search">
            <input className="search_input" type="text" />
            <SearchIcon className="header_searchIcon"/>
        </div>

        <div className="header_nav">
            <Link to={!user && "/login"}>
            <div className="header_option" onClick={handleAuthentication}>
                <span className="header_optionLine_1">
                    Hello {!user ? "Guest": user.email}
                </span>
                
                <span className="header_optionLine_2">
                    {user ? "Sign Out" : "Sign In"}
                </span>
              

            </div>
            </Link>  
            <Link to="/orders">
            <div className="header_option">
                <span className="header_optionLine_1">
                    Returns
                </span>
                <span className="header_optionLine_2">
                    & Orders
                </span>
                
            </div>
            </Link>
            <div className="header_option">
                <span className="header_optionLine_1">
                    Your
                </span>
                <span className="header_optionLine_2">
                    Prime
                </span>
                
            </div>
            <Link to="/checkout">
            <div className="header_basket">
                <ShoppingCartIcon className="cartIcon"/>
                <span className="header_optionLine_2 header_count">{basket.length}</span>
            </div>

            </Link>
            
            
        </div>
    </div>


    </>
        
    
}

export default Header;