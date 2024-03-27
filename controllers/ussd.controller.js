import { handleUserInput, setPhoneNumber } from "../utils/ussd/app.js";

export const ussdRequest = async (req, res) => {
  const { phoneNumber, text } = req.body;
  setPhoneNumber(phoneNumber);
  const response = await handleUserInput(text);
  res.send(response);
};
