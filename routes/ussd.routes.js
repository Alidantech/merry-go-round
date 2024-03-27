// ussd.routes.js
import express from "express";
import { handleUserInput, setPhoneNumber } from "./ussdApp";

const router = express.Router();

router.post("/ussd", (req, res) => {
  const { phoneNumber, text } = req.body;
  setPhoneNumber(phoneNumber); 
  const response = handleUserInput(text);
  res.send(response);
});

export default router;
