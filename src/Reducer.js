import {useState} from "react";


export const Initialstate={
    basket:[],
    user:null,
}

export const GetTotalprice=(basket)=>{
    
    //basket.reduce((amount,item)=>item.price+amount,0)
    let total=0
    basket.map((item)=>(total=total+item.price))
    return total;
}




const Reducer=(state,action)=>{
    console.log(state)
    

    //console.log(action)
    switch (action.type){

        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            }
        case "Add_to_basket":
            return{
                ...state,
                basket:[...state.basket,action.item],
            };
        case "Remove_from_basket":
            
            const index=state.basket.findIndex((item)=>(item.id === action.id));

            let newBasket=[...state.basket];
            if(index>=0){
                newBasket.splice(index,1);
            }
            else{
                console.log("error");
            }
            return{
                ...state,
                basket:newBasket,
            }
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }
        default:
            return state;

    }
}

export default Reducer;