const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const User = require('./models/user')
const {sendMail} = require('./mail.js')
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
    
    try {
        const user = new User({
            email ,
            password ,
            name ,
            is_verified : false
        })
        await user.save().then(async(response)=>{
            let subject = "Block Chain Account Verification"
            let html ="Greatings " + name + " <br><br> Happy to let you that your account is successfully created. <br><br>Kindly <a href='http://localhost:3000/verifyEmail/"+ response._id +"' >Click here to verify your Email address </a>" 
            let sendVerificationMail = await sendMail(email, subject, html)
            if(sendVerificationMail){
                // Save the user
                return res.status(200).send({
                    status : true ,
                    message : "Account is created ! Check your mail for verification " ,
                    data : response 
                }) 
            }else{
                let errorMessage = {
                    response :{data:{message:"Try again !"}}
                }
                return res.status(400).send({
                    status : false ,
                    message : errorMessage
                })
            }
           
        }).catch((err)=>{
            return res.status(400).send({
                status : false ,
                message : err
            })
        })
        
    } catch (error) {
        return res.status(400).send({
            status : false ,
            message : error
        })
    }
    
    



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
        let checkEmailverified =  await User.findOne({email , is_verified : true})
        if(checkEmailverified){
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
                message : "Email ID is not verified . kindy check your mail  !"
            })
        }
        
    }else{
        return res.status(400).send({
            status : false ,
            message : "Email is not registered !"
        })
    }
    
})


/* *********VERIFY EMAIL * */

app.post('/verifyemail/:id' , async (req , res)=>{
    const {id} = req.params
    var _id =  id;
    var update = {name :{is_verified : true}};
    const data = await User.findByIdAndUpdate(_id, { is_verified: true });
    if(data){
        return res.status(200).send({
            status : true ,
            message : "Verified"
        })
    }else{
        return res.status(400).send({
            status : false ,
            message : "Incorrect Email !"
        })
    }
})
