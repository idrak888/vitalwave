const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];

app.use(express.static(path.join(__dirname, '../my-app/out')));

const fs = require("fs");
const { parse } = require("csv-parse");
row = []

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { BayesClassifier } = require('natural');

// defining an array to work as the database (temporary solution)

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};
// adding morgan to log HTTP requests
app.use(morgan('combined'));

const readline = require("readline");
const { param } = require("express/lib/request");
const stream = fs.createReadStream("./readingFile.csv");
const rl = readline.createInterface({ input: stream });
let data = [];
rows = []
 
rl.on("line", (row) => {
    
    data.push(row.split(","));
    app.get('/api/key', (req, res) => {
        
        // console.log(req.query.name)
            params  = req.query.name.split(",")
            console.log(params)
            data.shift()
            str=""
            for (let i = 0; i < params.length; i++) {
               
                if (params[i].includes("^"))
                str += params[i].split("&").join(" ")
                if(params[i].includes("*")){
                    str += params[i].split("&").join(" ")
                }
            }
            str = str.replaceAll("^"," ").replaceAll("@"," ").replaceAll("*","")
            console.log(str)
            emer = emergency(str)
            type=type2(str)
            age=params[0]
            lat=params[2]
            long=params[3]
            
            console.log(emer)
            //make a call to api to get emergency and non-emergency
            if (emer == "emergency"){
                if (type == "ccu"){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][8] == "yes"){
                            rows.push(data[i])
                        }
                    }
                    //console.log(rows)
                }
                else if (type == "icu"){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][7] == "yes"){
                            rows.push(data[i])
                        }
                    }
                }
                else if(type == "vc"){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][9] == "yes"){
                            rows.push(data[i])
                        }
                    }
                }
                else if(type == "tc"){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][10] == "yes"){
                            rows.push(data[i])
                        }
                    }
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        rows.push("")
                        
                    }
                }
            }
            else if(emer == "non-emergency"){
                if(age <=17){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][2].includes("Pediatrics")){
                            rows.push(data[i])
                        }
                    }
                
                }
                else if(age >=16){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][2].includes("Adult Hospital") || data[i][2].includes("Hospital") ){
                            rows.push(data[i])
                        }
                    }
                }
                else if(age >=55 && age <=60){
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][2].includes("LTC") || data[i][2].includes("Specialized Care") ){
                            rows.push(data[i])
                        }
                    }
                }
                
            //res.send(data);
           }
        if (rows){
            if (emer == "emergency"){
                //find the closest location from rows
                for (let i = 0; i < rows.length; i++) {
                    rows[i].insert(rows[i].length,0)
                    rows[i][13] = getDistance(lat,long,rows[i][3],rows[i][4])
                    //console.log(rows[i])
                }
                //console.log(rows)
                //sort according to the capacity
                for (let i = 0; i < rows.length; i++) {
                    first_row = rows[i][0];
                    rows[i][0] = rows[i][13]
                    rows[i][13] = first_row
                }                
                rows.sort()
                //console.log(rows)
                
            }
            else if(emer == "non-emergency"){
                //sort according to the capacity
               //sort according to the capacity
               for (let i = 0; i < rows.length; i++) {
                first_row = rows[i][0];
                rows[i][0] = rows[i][13]
                rows[i][13] = first_row
                
            }                
            rows.sort()
            console.log(rows)
                //find the closest location from rows
                for (let i = 0; i < rows.length; i++) {
                    rows.insert(rows[i].length,0)
                    rows[i][13] = getDistance(lat,long,rows[i][3],rows[i][4])
                }
            }

        }
        // for (let i = 0; i < rows.length; i++) {
        //     first_row = rows[i][0];
        //     rows[i][0] = rows[i][12]
        //     rows[i][12] = first_row
            
        // }   
        
        for (let i = 0; i < rows.length; i++) {
            rows[i].shift()
            console.log(rows[i])
            fs.appendFile('test.csv', rows[i].join(",") + "\n", err => {
            });
        }
        res.send(rows.slice(0,10))

        
        
        });
});
 
rl.on("close", () => {
    //console.log(data);
});

function emergency(keywords) {

// machine learning model to learn is it emergency or not
const classifier = new BayesClassifier();

classifier.addDocument('Severe leg pain', 'emergency');
classifier.addDocument('blunt trauma', 'emergency');
classifier.addDocument('no pain after head impact', 'emergency');
classifier.addDocument('inability to walk', 'emergency');
classifier.addDocument('Diarrhea', 'non-emergency');
classifier.addDocument('pregnancy', 'emergency');
classifier.addDocument('vomiting', 'non-emergency');
classifier.addDocument('stomach cramping', 'non-emergency');
classifier.addDocument('vomiting', 'non-emergency');
classifier.addDocument('fever', 'non-emergency');
classifier.addDocument('fatigue', 'emergency');
classifier.addDocument('High grade fever', 'emergency');
classifier.addDocument('nose bleeds', 'emergency');
classifier.addDocument('rapid weight loss', 'non-emergency');
classifier.addDocument('shortness of breath', 'emergency');
classifier.addDocument('High degree fever, exhaustion, bleeding from the nose, quick weight loss, and shortness of breath', 'emergency');
classifier.addDocument('Unconsciousness', 'emergency');
classifier.addDocument('blunt head trauma', 'emergency');
classifier.addDocument('consciousness brought on by a direct head injury', 'emergency');
classifier.addDocument('cough', 'non-emergency');
classifier.addDocument('lack of taste', 'non-emergency');
classifier.addDocument('stuffy nose', 'non-emergency');
classifier.addDocument('shortness of breath', 'emergency');
classifier.addDocument('chest pain', 'emergency');
classifier.addDocument('confusion and delirium', 'emergency');
classifier.addDocument('unconsciousness', 'emergency');
classifier.addDocument('possible head injuries', 'emergency');
classifier.addDocument('Possible head injuries, a stuffy nose, a cough, a fever, poor taste, shortness of breath, chest pain, confusion and delirium, and a lack of taste', 'emergency');
classifier.addDocument('Abdominal discomfort', 'non-emergency');
classifier.addDocument('loss of appetite', 'non-emergency');
classifier.addDocument('gastrointestinal discomfort, vomiting, diarrhoea, and appetite loss', 'emergency');
classifier.addDocument('vomiting, stomach pain, diarrhoea, and low-grade fever', 'non-emergency');


classifier.train();
return classifier.classify(keywords); 
}


function type2(keywords) {

const Types = new BayesClassifier();

Types.addDocument('Severe leg pain', 'tc');
Types.addDocument('blunt trauma', 'tc');
Types.addDocument('no pain after head impact', 'tc');
Types.addDocument('inability to walk', 'tc');
Types.addDocument('pregnancy', 'icu');
Types.addDocument('vomiting', 'ccu');
Types.addDocument('fatigue', 'ccu');
Types.addDocument('nose bleeds', 'vc');
Types.addDocument('shortness of breath', 'ccu');
Types.addDocument('High degree fever, exhaustion, bleeding from the nose, quick weight loss, and shortness of breath', 'ccu');
Types.addDocument('Unconsciousness', 'tc');
Types.addDocument('blunt head trauma', 'tc');
Types.addDocument('consciousness brought on by a direct head injury', 'tc');
Types.addDocument('cough', 'ccu');
Types.addDocument('shortness of breath', 'ccu');
Types.addDocument('chest pain', 'ccu');
Types.addDocument('confusion and delirium', 'tc');
Types.addDocument('possible head injuries', 'tc');
Types.addDocument('Possible head injuries, a stuffy nose, a cough, a fever, poor taste, shortness of breath, chest pain, confusion and delirium, and a lack of taste', 'tc');
Types.addDocument('gastrointestinal discomfort, vomiting, diarrhoea, and appetite loss', 'ccu');



Types.train();
return (Types.classify(keywords)); // spam
}
function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});