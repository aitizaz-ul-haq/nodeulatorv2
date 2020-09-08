const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 1234;


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * start express server 
 */


app.listen(port, () => {
    console.info(`server is live on ${port}`)
})


/**
 * creating an array for data storage
 */

let dataArr = [];

app.get('/', (req, res) => {
    return res.json({
        status: true,
        message: 'nodulator lives'
    })
});


/**
 * add user inputs
 */

app.post('/userInput', (req, res) => {
    const { numOne, numTwo, Operation } = req.body; // destructuring
    
    let newCal = {
        
        numOne: numOne,
        numTwo: numTwo,
        Operation: Operation
    }

    dataArr.push(newCal);
    return res.json({
        status: true,
        message: 'calculator instructions',
        data: newCal
    });
});



/**
 * get userinput by operation
 */


app.get('/userInputAndOp/', (req, res) => {
    
    
    if(dataArr.length > 0) {
    // find in array 
    dataArr.forEach((element) => {
            

            //Assigining user inputs to variables
            let numOne = parseInt(element.numOne);
            let numTwo = parseInt(element.numTwo);
            let result;
            
            //user input operation functions
            let addFunc    = (numOne , numTwo) => { result = numOne + numTwo; }
            let subFuncOne = (numOne , numTwo) => { result = numOne - numTwo; }
            let subFuncTwo = (numOne , numTwo) => { result = numTwo - numOne; }
            let multFunc   = (numOne , numTwo) => { result = numOne * numTwo; }
            let divFunc    = (numOne , numTwo) => { result = numOne / numTwo; }

        
        // Addition Operation
        if(element.Operation === "Addition") {
                 addFunc(numOne, numTwo);
                return res.json({
                status: true,
                data : result
            })
        }




        // Subtraction Operation
        else if (element.Operation === "Subtraction") {
               
              if( numOne > numTwo) {
                subFuncOne(numOne, numTwo);
                return res.json({
                    status: true,
                    data : result
                })
              }  else {
                  subFuncTwo(numTwo, numOne)
                  return res.json({
                    status: true,
                    data : result
                })
              }
         }
 
        



        // Multiplication Operation
        else if (element.Operation === "Multiplication") {

            multFunc(numOne, numTwo);
            return res.json({
                status: true,
                data : result
            })
        }





        // Division Operation
        else if (element.Operation === "Division") {

            divFunc(numOne, numTwo);
            return res.json({
                status: true,
                data : result
            })
        }

        


    })
    } else {
        dataArr.length == 0;
        return res.json({
            status: false,
            message: 'no data found or invalid operation'
        })
    }
 });


