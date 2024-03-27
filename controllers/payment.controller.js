import axios from "axios";
import prettyjson from "prettyjson"; 

export async function payAmount(req, res) {
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  if (!phone)
    return res.status(400).json({ message: "Phone Number is required" });
  if (!amount) return res.status(400).json({ message: "Amount is required" });

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const shortCode = process.env.MPESA_PAYBILL;
  const passkey = process.env.MPESA_PASSKEY;
  let token = req.token;

  const password = Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortCode,
        PhoneNumber: `254${phone}`,
        CallBackURL:
          process.env.CALLBACKURL ||
          "https://96n9704p-5050.uks1.devtunnels.ms/",
        AccountReference: `${phone}`,
        TransactionDesc: "TEST",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to make payment" });
  }
}

export async function myCallBack(req, res) {
 try {
   const options = {
     noColor: true,
   };
   console.log(prettyjson.render(req.body, options));
   if (req.body.Body && req.body.Body.stkCallback) {
     const {
       MerchantRequestID,
       CheckoutRequestID,
       ResultCode,
       ResultDesc,
       CallbackMetadata,
     } = req.body.Body.stkCallback;
     if (!CallbackMetadata) {
       console.log(ResultDesc);
       res.status(200).json("ok");
       return;
     }
     if (ResultCode === 0) {
       //     get the meta data from the meta
       const meta = Object.values(await CallbackMetadata.Item);
       console.log(meta);
       const PhoneNumber = meta
         .find((o) => o.Name === "PhoneNumber")
         .Value.toString();
       const Amount = meta.find((o) => o.Name === "Amount").Value.toString();
       const MpesaReceiptNumber = meta
         .find((o) => o.Name === "MpesaReceiptNumber")
         .Value.toString();
       const TransactionDate = meta
         .find((o) => o.Name === "TransactionDate")
         .Value.toString();

       // do something with the data
       console.log("-".repeat(20), " OUTPUT IN THE CALLBACK ", "-".repeat(20));
       console.log(`
         
          MerchantRequestID : ${MerchantRequestID},
          CheckoutRequestID: ${CheckoutRequestID},
          ResultCode: ${ResultCode},
          ResultDesc: ${ResultDesc},
          PhoneNumber : ${PhoneNumber},
          Amount: ${Amount}, 
          MpesaReceiptNumber: ${MpesaReceiptNumber},
          TransactionDate : ${TransactionDate}
      `);

       const newTransaction = new LipaNaMpesaTransaction({
         Amount: Amount,
         MpesaReceiptNumber: MpesaReceiptNumber,
         TransactionDate: TransactionDate,
         PhoneNumber: PhoneNumber,
       });

       // Save the transaction to the database
       await newTransaction.save();
       console.log(newTransaction);

       //db(MpesaReceiptNumber,Amount,TransactionDate,PhoneNumber)

       // Send response
       res.json({
         MerchantRequestID,
         CheckoutRequestID,
         ResultCode,
         ResultDesc,
         PhoneNumber,
         Amount,
         MpesaReceiptNumber,
         TransactionDate,
       });
     } else if (ResultCode === 1032) {
       const meta = Object.values(await CallbackMetadata.Item);
       console.log(meta);
       const PhoneNumber = meta
         .find((o) => o.Name === "PhoneNumber")
         .Value.toString();
       const Amount = meta.find((o) => o.Name === "Amount").Value.toString();
       const MpesaReceiptNumber = meta
         .find((o) => o.Name === "MpesaReceiptNumber")
         .Value.toString();
       const TransactionDate = meta
         .find((o) => o.Name === "TransactionDate")
         .Value.toString();

       // do something with the data
       console.log("-".repeat(20), " OUTPUT IN THE CALLBACK ", "-".repeat(20));
       console.log(`
         
          MerchantRequestID : ${MerchantRequestID},
          CheckoutRequestID: ${CheckoutRequestID},
          ResultCode: ${ResultCode},
          ResultDesc: ${ResultDesc},
          PhoneNumber : ${PhoneNumber},
          Amount: ${Amount}, 
          MpesaReceiptNumber: ${MpesaReceiptNumber},
          TransactionDate : ${TransactionDate}
      `);
     } else {
       console.log("stkCallback is missing in the request body");
     }
   }
 } catch (e) {
   console.error(
     "Error while trying to update LipaNaMpesa details from the callback",
     e
   );
   res.status(503).send({
     message: "Something went wrong with the callback",
     error: e.message,
   });
 }
}

// const db=(receiptNumber,amount,transactionDate,phoneNumber)=>{
/* const allTransactions=await Transaction.find();
        console.log(allTransactions)
        return res.status(200).json(allTransactions)

    } catch (error) {
        console.log(error.message)
        return res.send({
            success:false,
            message:error.message
        });
    }
}  
*/

export async function stkpushQuery(req, res) {
   const CheckoutRequestID = req.body.CheckoutRequestID;

   const date = new Date();
   const timestamp =
     date.getFullYear() +
     ("0" + (date.getMonth() + 1)).slice(-2) +
     ("0" + date.getDate()).slice(-2) +
     ("0" + date.getHours()).slice(-2) +
     ("0" + date.getMinutes()).slice(-2) +
     ("0" + date.getSeconds()).slice(-2);
   const shortCode = process.env.MPESA_PAYBILL;
   const passkey = process.env.MPESA_PASSKEY;
   let token = req.token;
   console.log(token);
   const password = Buffer.from(shortCode + passkey + timestamp).toString(
     "base64"
   );

   try {
     const response = await axios.post(
       "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
       {
         BusinessShortCode: shortCode,
         Password: password,
         Timestamp: timestamp,
         CheckoutRequestID: CheckoutRequestID,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
     res.status(200).json(response.data);
   } catch (err) {
     console.log(err.message);
     res.status(400).json({ error: "Failed to query STK push" });
   }
}

export async function fetchAllTransactions(req, res) {
   try {
     //const { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber } = req.query;
     const query = {};

     if (req.body.Amount) {
       query.Amount = req.body.Amount;
     }
     if (req.body.MpesaReceiptNumber) {
       query.MpesaReceiptNumber = req.body.MpesaReceiptNumber;
     }
     if (req.body.TransactionDate) {
       query.TransactionDate = req.body.TransactionDate;
     }
     if (req.body.PhoneNumber) {
       query.PhoneNumber = req.body.PhoneNumber;
     }

     const transactions = await LipaNaMpesaTransaction.find(query).exec();

     console.log(transactions);

     res.json(transactions);
   } catch (error) {
     console.log(error.message);
     return res.status(400).json({
       success: false,
       message: error.message,
     });
   }
}

export async function fetchOneTransaction(req, res) {
  try {
    const { id } = req.params;
    const transaction = await LipaNaMpesaTransaction.findById(id);
    console.log(transaction);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.log("Error fetching transaction:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}