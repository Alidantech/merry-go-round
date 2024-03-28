import UserInputHandler from "../utils/ussd/app.js";

const userInputHandler = new UserInputHandler();

export const ussdRequest = async (req, res) => {
  const { phoneNumber, text } = req.body;
  userInputHandler.setPhoneNumber(phoneNumber);
  const response = await userInputHandler.handleInput(text);
  res.send(response);
};

export default userInputHandler;