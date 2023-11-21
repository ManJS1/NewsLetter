const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html")
})

app.post("/",function(req,res){
    const First_name = req.body.fName;
    const Last_name = req.body.lName;
    const Email = req.body.email;

    const data = {
        members:[
            {
                email_address: Email,
                status: "subscribed",
                merge_field:{
                    FNAME: First_name,
                    LNAME: Last_name
                }
            }
        ]
    };

     const jsonData = JSON.stringify(data);

     const url = "https://us21.api.mailchimp.com/3.0/lists/0ab5ee1230";

     const options = {
        method: "POST",
        auth: "manj:fac030751280f0964a463f5f087d2125-us21"
     }

    //  const request = https.request(url,options,function(response){
    //     response.on("data",function(data){
    //         console.log(JSON.parse(data));
    //     })
    //  })
    
        const request = https.request(url, options, function (response) {

            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html");
            }

            let responseData = "";
            response.on("data", function (chunk) {
                responseData += chunk;
            });

            response.on("end", function () {
                    const parsedData = JSON.parse(responseData);
                    console.log(parsedData);
                
            });
    });
     request.write(jsonData);
     request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server is running on 3000 port");
})


// fac030751280f0964a463f5f087d2125-us21

// 0ab5ee1230

// heroku : we can host upto 5 website for free