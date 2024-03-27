import {
  INVALID_REQUEST_MESSAGE,
  ACCOUNT_CREATION_PROMPTS,
} from "../responses.js";
import { getPhoneNumber, setUserContext } from "../app.js";

import { registerUser } from "../../../database/services/users.services.js";

// Variable for index
let _index = null;
let _text = null;

// User registration object to store user info
let userRegistration = {
  phoneNumber: null,
  fullName: null,
  idNumber: null,
  dob: null,
  gender: "",
  avatar: "",
  groups: [],
};

// Menu generator for create account menu
async function generateCreateAccountMenu(text, index) {
  let prompt = "";
  setIndex(index);
  setText(text);
  userRegistration.phoneNumber = getPhoneNumber(); // Assigning directly without redeclaration
  console.log("Text inside create account menu", _text);
  if (_text && !userRegistration.fullName) {
    userRegistration.fullName = _text;
    prompt += `CON ${ACCOUNT_CREATION_PROMPTS.ID_NUMBER}`;
  } else if (_text && !userRegistration.idNumber) {
    userRegistration.idNumber = _text;
    prompt += `CON ${ACCOUNT_CREATION_PROMPTS.DATE_OF_BIRTH}`;
  } else if (_text && !userRegistration.dob) {
    userRegistration.dob = _text;
    console.log("User registration", userRegistration);
    await registerUser(userRegistration);
    // reset the user context
    setUserContext("welcome", 0);

    prompt += `END ${ACCOUNT_CREATION_PROMPTS.SUCCESS}`;
  } else {
    setUserContext("welcome", 0);
    prompt = `END ${INVALID_REQUEST_MESSAGE}`;
  }

  return prompt;
}

// Set the index to start from
export function setIndex(index) {
  _index = index;
}

// Set the text to start from the index
export function setText(text) {
  if (_index >= text.length || text.length === 0) {
    _text = "";
  } else {
    // Split the text based on '*' delimiter and get the last element
    const parts = text.split("*");
    _text = parts[parts.length - 1];
  }
}

export default generateCreateAccountMenu;
