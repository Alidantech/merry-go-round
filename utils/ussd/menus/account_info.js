import { setUserContext } from "../app.js";
import { INVALID_REQUEST_MESSAGE, USER_ACCOUNT_VIEW } from "../responses.js";

// variable for index
let _index = null;
let _text = null;

function generateAccountViewMenu(user, text, index) {
  let prompt = "";
  setIndex(index);
  setText(text);
  // show the options from array
  if (_text === "")
    prompt = USER_ACCOUNT_VIEW.map((item) => {
      return item + "\n";
    });
  else if (_text === "1") prompt = `END ${user.phoneNumber}`;
  else if (_text === "2") prompt = `END ${user.idNumber}`;
  else if (_text === "3") prompt = `END ${user.fullName}`;
  else if (_text === "4") prompt = `END ${user.dob}`;
  else if (_text === "5") prompt = `END This feature is not available yet.`;
  else prompt = `END ${INVALID_REQUEST_MESSAGE}`;

  return prompt;
}

// set the index to start from
export function setIndex(index) {
  _index = index;
}

// Set the text to start from the index
export function setText(text) {
  if (_index >= text.length || text.length === 0) {
    _text = "";
  } else {
    _text = text.slice(_index);
  }
}

export default generateAccountViewMenu;
