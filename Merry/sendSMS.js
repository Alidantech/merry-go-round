const AfricasTalking = require('africastalking');


const africastalking = AfricasTalking({
  apiKey: '80c9e8b66d50e59ce39f9138910f504bf10825d6f5f8edf54942b8e482d2624',
  username: 'Ruwenzori'
});


module.exports = async function sendSMS() {
 
    try {
  const result=await africastalking.SMS.send({
    to: ["+254748311679"],
    message: 'Hello Alidante! how are you?',
    from: ''
  });
  console.log(result);
} catch(ex) {
  console.error(ex);
}


};
