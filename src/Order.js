import React from 'react';
import "./Order.css";
import moment from "moment";
import {db} from "./Firebase";
import CheckoutProd from './CheckoutProd';
import CurrencyFormat from 'react-currency-format';


function Order({order}){


    return <>
    <div className="order">
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p>
        <p className="order_id">
            <small>{order.id}</small>
        </p>
        {order.data.basket?.map(item => (
            <CheckoutProd
             id={item.id}
             title={item.title}
             image={item.image}
             price={item.price}
             rating={item.rating}
             hideButton
            
            />


        ))}
        <CurrencyFormat
        renderText={(value)=>(
            <h3 className="order_total">Order Total:{value}</h3>
        )}
        displayType={"text"}
        value={order.data.amount /100}
        decimalScale={2}
        thousandSeparator={true}
        prefix={"Rs."}
        />
    </div>


    </>
}

export default Order;