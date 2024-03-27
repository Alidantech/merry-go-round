const express = require('express');
const sendSMS = require('./sendSMS');


const app = express();




module.exports = function smsServer() {
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));


        app.post('/incoming-messages', (req, res) => {
  const data = req.body;
  console.log(`Received message: \n ${data}`);
  res.sendStatus(200);
});




    const port = process.env.PORT;


    app.listen(port, () => {
        console.log(`App running on port: ${port}`);


    });
};
