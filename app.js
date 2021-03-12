const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { send } = require("process");

app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html"); 
    
    
})

app.post("/", function(request, response){
   const firstName = request.body.firstName;
   const lastName = request.body.lastName;
   const email = request.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us1.api.mailchimp.com/3.0/lists/7adfcba07b"
   const options = {
       method: "POST",
       auth:"Moha1:9250e52fe9f754d1c4627e40e9e8aff2-us1"
    }

    
   

    const req = https.request(url, options, function(response){
        
        
        response.on("data", function(data){
           
            console.log(JSON.parse(data));
            
        
        })
        
    })


    req.write(jsonData);
    
    req.end();
    
    if(response.statusCode === 200){
        response.sendFile(__dirname + "/success.html");

    }else{
        response.sendFile(__dirname + "/failure.html");
    }
   
});




app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000")
})




//API KEY
// 9250e52fe9f754d1c4627e40e9e8aff2-us1


// LIST ID
// 7adfcba07b