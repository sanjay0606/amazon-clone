import React,{useEffect} from "react";
import Header from "./Header";
import Home from "./Home";
import './App.css';
import Checkout from "./Checkout";
import Payment from "./Payment";
import Login from "./Login";
import Orders from "./Orders";
import {BrowserRouter as Router ,Switch,Route} from "react-router-dom";
import {auth} from "./Firebase";
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise=loadStripe("pk_test_51JdxOSSJQyEyC8GNeKyZkplj4K2X7R3cC2jK5mwW2klLfSa87Cawspifdb3QadAP2IrL1Z6WZ8jIxzncrhNrKjCB00WRZBMrtb");


function App() {
  const[state,dispatch]=useStateValue();
  useEffect(()=>{
    
    auth.onAuthStateChanged(authUser=>{
      console.log(">>>>>>>",authUser);

      if(authUser){
        dispatch({
          type:"SET_USER",
          user:authUser

        })

      }
      else{
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })


  },[])
  return (
    <Router>
      <div className="App">
      
        <Switch>
        <Route  path="/login">
            
            <Login/>
            
          </Route>
          <Route  path="/orders">
            <Header/>
            <Orders/>
            
          </Route>
          
          <Route  path="/checkout">
            <Header/>
            <Checkout/>
            
          </Route>
          <Route  path="/payment">
            <Header/>
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
            
            
            
          </Route>
          
          <Route path="/">
            <Header/>
            <Home />
          </Route>
          
       


        </Switch>
      </div>
    </Router>
  
  );
}

export default App;
