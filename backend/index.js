const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const User = require('./models/user')
// connect to express
const app = express()
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// CONNECT TO MONGO DB
const dbUrl = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_WORD}@cluster0.njjsn.mongodb.net/blockchain?retryWrites=true&w=majority`

mongoose.connect(dbUrl).then((result)=>{
    console.log("DB Connected"); 
    app.listen(3001)
    console.log("APP IS LISTENING ON : 3001"); 
}).catch((err)=> {
    console.log("DB Connection Failure ::" , err)
})


// Routes AND THEIR FUNCTIONS ...

/* ************************* */
/* ********SIGNUP*********** */
/* ************************* */

app.post('/signup', async (req , res) =>{
    const { email , password , name } = req.body
    //Check for the mandatory Feild
    if(!email || !password ){
        return res.status(400).send({
            status : false ,
            message : "Email and password is mandatory !"
        })
    }
    //Check Email is Already Registered
    let findExist = await User.findOne({email})
    if(findExist){
        return res.status(400).send({
            status : false ,
            message : "Email is already exist !"
        })
    }
    // Create a User schema
    const user = new User({
        email ,
        password ,
        name ,
    })
    // Save the user
    await user.save().then((response)=>{
        return res.status(200).send({
            status : true ,
            message : "Account is created ! " ,
            data : response 
        }) 
    }).catch((err)=>{
        return res.status(400).send({
            status : false ,
            message : err
        })
    })
})

/* ************************* */
/* ********LOGIN *********** */
/* ************************* */

app.post('/login' , async (req , res) =>{
    const { email , password  } = req.body
    //Check for the mandatory Feild
    if(!email || !password ){
        return res.status(400).send({
            status : false ,
            message : "Email and password is mandatory !"
        })
    } 
    //Check Email is registered or Not
    let checkEmail =  await User.findOne({email})
    if(checkEmail){
        // Check the Username and password
        let findExist = await User.findOne({email , password})
        console.log("findExist" , findExist)
        if(findExist){
            return res.status(200).send({
                status : true ,
                message : "Login Success "
            })
        }else{
            return res.status(400).send({
                status : false ,
                message : "Incorrect Email / Password !"
            })
        }
    }else{
        return res.status(400).send({
            status : false ,
            message : "Email is not registered !"
        })
    }
    
})
