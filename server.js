import express from "express";
import cors from "cors";
import { sendAlertViaSMS } from "./messages/sms.js";
const transactions=require('./routes/payments.routes.js')
const app = express();
const PORT = process.env.PORT || 3000;
const {connectDb} = require("./db.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDb()
app.use('/api',transactions)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
