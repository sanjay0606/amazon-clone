import React from "react";
import { useHistory } from "react-router";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import {GetTotalprice} from "./Reducer";



function Subtotal(){
    const history=useHistory();

    const [{basket},dispatch]=useStateValue();
    console.log(GetTotalprice(basket));
    return <>
    <div className="subtotal">
        <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>Subtotal ({basket.length} items): <strong> {value}</strong></p>
            <small className="subtotal_gift">
                <input type="checkbox"/>This orders contains a gift
            </small>
            </>
        )}
        displayType={"text"}
        value={GetTotalprice(basket)}
        decimalScale={2}
        thousandSeparator={true}
        prefix={"Rs."}
        />
        
        <button onClick={(e)=>history.push("/payment")}>Proceed to Checkout</button>

    </div>
    </>
}


export default Subtotal;