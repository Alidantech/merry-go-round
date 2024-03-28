import {
  INVALID_REQUEST_MESSAGE,
  ACCOUNT_CREATION_PROMPTS,
} from "../responses.js";
import { registerUser } from "../../../database/services/users.services.js";

let userRegistration = {
  phoneNumber: null,
  fullName: null,
  idNumber: null,
  dob: null,
  gender: "",
  avatar: "",
  groups: [],
};

export async function generateCreateAccountMenu(text, phoneNumber) {
  userRegistration.phoneNumber = phoneNumber;
  let prompt = "";

  if (text === "1" && !userRegistration.fullName) {
    prompt += `CON ${ACCOUNT_CREATION_PROMPTS.FULL_NAME}`;
  } else if (text && !userRegistration.fullName) {
    userRegistration.fullName = text;
    prompt += `CON ${ACCOUNT_CREATION_PROMPTS.ID_NUMBER}`;
  } else if (text && !userRegistration.idNumber) {
    userRegistration.idNumber = text;
    prompt += `CON ${ACCOUNT_CREATION_PROMPTS.DATE_OF_BIRTH}`;
  } else if (text && !userRegistration.dob) {
    userRegistration.dob = text;
    try {
      console.log("User registration", userRegistration);
      await registerUser(userRegistration);
      // Reset user registration for next session
      userRegistration = {
        phoneNumber: null,
        fullName: null,
        idNumber: null,
        dob: null,
        gender: "",
        avatar: "",
        groups: [],
      };
      prompt = "success";
    } catch (error) {
      console.error("Error registering user:", error);
      prompt = `END ${INVALID_REQUEST_MESSAGE}`; // or any other error message
    }
  } else {
    prompt = `END ${INVALID_REQUEST_MESSAGE}`;
  }

  return prompt;
}
