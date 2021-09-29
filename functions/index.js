const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const { ThumbUpAltOutlined } = require("@material-ui/icons");
const stripe=require("stripe")("sk_test_51JdxOSSJQyEyC8GN8beGXgA3wmqm2poC30t5JzD28mqUGSuWnrjGJqNKcmDNdK2WViTPxawIuTpQOV9FnEO9uxig00V0W6CL9Z");




const app=express();


app.use(cors({ origin:true }));
app.use(express.json());

app.get("/",(request,response)=>response.status(200).send("hello world"));

app.post("/payment/create", async (request,response)=>{
    const total = request.query.total;
    console.log("got thrrr>>>>",total)

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"INR",

    })

    response.status(201).send({
        clientsecret:paymentIntent.client_secret,
    })
})

exports.api=functions.https.onRequest(app);

//http://localhost:5001/e-clone-81506/us-central1/api