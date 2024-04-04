let express =  require("express")
let app = express()
let bodyparser = require("body-parser")
let nodemailer = require("nodemailer")


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())




//!Authentication
let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user: 'your gmail id',
    pass: 'your gmail id password'
    }

})



app.get("/", (req,res)=>{
res.render("index.ejs")
})

app.get("/thank", (req,res)=>{
    res.render("thank.ejs")
})
app.post("/thanks", (req,res)=>{
   
    let email = req.body.Email
    let mailoption = {
        from:"from message",
        to:email,
        subject:"subject you want to send",
        text:"text you want to send"
    }
    
    transporter.sendMail(mailoption,(error,info)=>{
      if(error){
        console.log(error)
      }
      else{
        console.log("Email send🙌", info.response)
      }
    })
    res.redirect("/thank")

})


app.listen(3000)
