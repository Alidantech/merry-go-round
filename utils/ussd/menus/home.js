import { setUserContext } from "../app.js";
import {
  WELCOME_MESSAGE,
  MAIN_MENU,
  NO_GROUPS_MESSAGE,
  GREET_USER,
  ABOUT_MESSAGE,
  INVALID_REQUEST_MESSAGE,
  THANK_YOU_MESSAGE,
  ERROR_MESSAGE,
  GROUP_CREATION_PROMPTS,
  ACCOUNT_CREATION_PROMPTS,
} from "../responses.js";
import generateAccountViewMenu from "./account_info.js";

// variable for index
let _index = null;
let _text = null;

// Menu generator for welcome menu
function generateWelcomeMenu(
  registered,
  user,
  userId,
  text,
  index,
  userGroups
) {
  let prompt = "";
  setIndex(index);
  setText(text);
  if (!registered) {
    prompt += showRegistrationOptions();
  } else if (user) {
    prompt += showRegisteredUserOptions(userId, user, userGroups);
  } else {
    prompt = `END ${INVALID_REQUEST_MESSAGE}`;
  }
  return prompt;
}

// Menu generator for registration menu
function showRegistrationOptions() {
  if (_text === "") {
    return `CON ${WELCOME_MESSAGE}\n${MAIN_MENU.CREATE_ACCOUNT}\n${MAIN_MENU.ABOUT}`;
  } else if (_text === "1") {
    setUserContext("create_account", _text.length);
    return `CON ${ACCOUNT_CREATION_PROMPTS.FULL_NAME}`;
  } else if (_text === "99") {
    // setUserContext("about", _text.length);
    return `END ${ABOUT_MESSAGE}`;
  } else {
    return `END ${INVALID_REQUEST_MESSAGE}`;
  }
}

// Menu generator for group menu
function showRegisteredUserOptions(userId, user, userGroups) {
  try {
    const commonOptions = `${MAIN_MENU.MY_ACCOUNT}\n${MAIN_MENU.CREATE_GROUP}\n${MAIN_MENU.ABOUT}\n${MAIN_MENU.EXIT}`;
    if (_text === "") {
      const greeting = `${GREET_USER} ${user.fullName}`;
      if (user.groups.length === 0) {
        return `CON ${greeting}\n${NO_GROUPS_MESSAGE}\n${commonOptions}`;
      } else {
        // console.log("User groups:", userGroups);
        let response = `CON ${greeting}\n`;
        response += "Your groups:\n";
        userGroups.forEach((group, index) => {
          response += `${index + 1}. ${group.name}\n`;
        });
        response += "\n";

        return (response += `${commonOptions}`);
      }
    } else if (_text === "97") {
      setUserContext("account_info", _text.length);
      return generateAccountViewMenu(user, _text, 0);
    } else if (_text === "00") {
      setUserContext("welcome", 0);
      return `END ${THANK_YOU_MESSAGE}`;
    } else if (_text === "98") {
      setUserContext("create_group", _text.length);
      return `CON ${GROUP_CREATION_PROMPTS.NAME}`;
    } else if (_text === "99") {
      // setUserContext("about", _text.length);
      setUserContext("welcome", 0);
      return `END ${ABOUT_MESSAGE}`;
    }
  } catch (error) {
    console.error("Error showing user options:", error);
    // Handle error gracefully
    return `END ${ERROR_MESSAGE}`;
  }
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

export default generateWelcomeMenu;
