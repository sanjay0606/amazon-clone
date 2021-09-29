import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";


function Product({id,title,price,image,rating}){
    const [state,dispatch]=useStateValue();

    const addtoBasket=()=>{
        dispatch({
            type:"Add_to_basket",
            item:{
                id:id,
                title:title,
                price:price,
                image:image,
                rating:rating,
            },
        })
    }
    return <>
    <div className="product">
        <div className="product_info">
            <p>{title}</p>
            <p className="product_price">
                <small><b>Rs.</b></small>
                <strong>{price}</strong>
            </p>
            <div className="product_Rating">
                {Array(rating).fill().map((_,i)=>(
                    <p>🌟</p>
                ))}
                
                
            </div>
            
        </div>
        <img src={image} alt="" />
        <button onClick={addtoBasket}>Add To Basket</button>

    </div>
    </>


}


export default Product;