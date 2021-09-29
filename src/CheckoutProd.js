import React from "react";
import "./CheckoutProd.css";
import { useStateValue } from "./StateProvider";

function CheckoutProd({id,image,title,price,rating,hideButton}){
    const[state,dispatch]=useStateValue();
    const removeFromBasket=()=>{
        dispatch({
            type:"Remove_from_basket",
            id:id,
        }
        )

    }

    return (
        <div className="checkoutprod">
            <img className="checkoutprod_image" src={image}/>

            <div className="checkoutprod_info">
                <p className="checkoutprod_title">{title}</p>
                <p className="checkoutprod_price">
                    <small><b>Rs.</b></small>
                    <strong>{price}</strong>
                    </p>
                <div className="checkproduct_Rating">
                {Array(rating).fill().map((_,i)=>(
                    <p>🌟</p>
                ))}
                
                
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from basket</button>

                )}
                
            </div>
        </div>

    )
}


export default CheckoutProd;