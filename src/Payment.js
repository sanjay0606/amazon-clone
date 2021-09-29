import React,{useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProd from "./CheckoutProd";
import { useElements,useStripe,CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {GetTotalprice} from "./Reducer";
import axios from "./axios";
import {db} from "./Firebase";




function Payment(){
    const[error,setError]=useState(null);
    const[disabled,setDisabled]=useState(true);
    const[succeeded,setSucceeded]=useState(true);
    const[process,setProcess]=useState(false);
    const[clientsecret,setSecret]=useState(true);
    const[{basket,user},dispatch]=useStateValue();

    const history=useHistory();

    useEffect(()=>{
        const getClientsecret=async()=>{
            const response =await axios({
                method:"post",
                url:`/payment/create?total=${GetTotalprice(basket)*100}`
            });
            setSecret(response.data.clientsecret)
        } 
        
        getClientsecret();

    },[basket])

    console.log("here>>>>>>",clientsecret)
    
    


    const handleSubmit=async(event)=>{
        event.preventDefault();
        setProcess(true);

        const payload=await stripe.confirmCardPayment(clientsecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
            }).then(({paymentIntent})=>{


                db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })

                
                setSucceeded(true);
                setError(null);
                setProcess(false);

                console.log("process",process)
                console.log("succeeded",succeeded)
                dispatch({
                    type:"EMPTY_BASKET"
                })
            

                history.replace("/orders")

        })
        

    }
    const handleChange=(event)=>{


        setDisabled(event.empty);
        console.log(event.empty);
        setError(event.error?event.error.message : "");

    }

    const stripe=useStripe();
    const elements=useElements();

    
    return(
        <div className="payment">
            <div className="payment_container">
                
                <h1> Checkout
                    (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment-title">
                        <h3>Delivery Address :</h3>
                    </div>
                    <div className="paymnet-address">
                        <p>{user?.email}</p>
                        <p>house-No-1143</p>
                        <p>Chandigarh,Punjab</p>
                    </div>

                </div>
                <div className="payment_section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map((item)=>(
                            <CheckoutProd id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating}/>
                        ))}
                    </div>
                    
                </div>
                <div className="payment_section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContaioner">
                            <CurrencyFormat
                                renderText={(value)=>(
                                        <>
                                        <h4>OrderTotal: <strong> {value}</strong></h4>
                                        
                                        </>
                                        )}
                                displayType={"text"}
                                value={GetTotalprice(basket)}
                                decimalScale={2}
                                thousandSeparator={true}
                                prefix={"Rs."}
                                />
                                
                                <button disabled={disabled} >
                                    <span>{process ? <p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )


    
}

export default Payment;