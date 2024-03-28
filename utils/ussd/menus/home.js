import e from "cors";
import {
  WELCOME_MESSAGE,
  MAIN_MENU,
  NO_GROUPS_MESSAGE,
  GREET_USER,
  ABOUT_MESSAGE,
  INVALID_REQUEST_MESSAGE,
  THANK_YOU_MESSAGE,
  ERROR_MESSAGE,
  GROUP_MEMBER_MENU,
  GROUP_ADMIN_MENU,
  GROUP_CREATION_PROMPTS,
  ACCOUNT_CREATION_PROMPTS,
} from "../responses.js";

// Menu generator for registration menu
export function showRegistrationOptions(text) {
  if (text === "") {
    return `CON ${WELCOME_MESSAGE}\n${MAIN_MENU.CREATE_ACCOUNT}\n${MAIN_MENU.ABOUT}`;
  } else if (text === "1") {
    return;
  } else if (text === "99") {
    return `END ${ABOUT_MESSAGE}`;
  } else {
    console.log("INVALID REQUEST REGISTER REQ:", text);
    return `END ${INVALID_REQUEST_MESSAGE}`;
  }
}

// Menu generator for group menu
export function showRegisteredUserOptions(userId, user, userGroups, text) {
  console.log("text", text);
  try {
    const commonOptions = `${MAIN_MENU.MY_ACCOUNT}\n${MAIN_MENU.CREATE_GROUP}\n${MAIN_MENU.ABOUT}\n${MAIN_MENU.EXIT}`;
    if (text === "") {
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
    } else if (text === "97") {
      return `END Full Name: ${user.fullName}\nID Number: ${user.idNumber}\nPhone Number: ${user.phoneNumber}\nDate of Birth: ${user.dob}`;
    } else if (text === "00") {
      return `END ${THANK_YOU_MESSAGE}`;
    } else if (text === "98") {
      console.log("Create group prompt:", GROUP_CREATION_PROMPTS.NAME);
      return "create";
    } else if (text === "99") {
      return `END ${ABOUT_MESSAGE}`;
    } else if(text === "8") {
      console.log("Create group prompt:", GROUP_CREATION_PROMPTS.NAME);
      return "create";
    }
    else {
      console.log("INVALID REQUEST:", text);
      return `END ${INVALID_REQUEST_MESSAGE}`;
    }
  } catch (error) {
    console.error("Error showing user options:", error);
    return `END ${ERROR_MESSAGE}`;
  }
}

// show the group member options when user selects group:
export function showGroupMemberOptions() {
  if (text === "") {
    return `CON ${GROUP_MEMBER_MENU.VIEW}\n${GROUP_MEMBER_MENU.JOIN}\n${GROUP_MEMBER_MENU.BACK}`;
  } else if (_text === "0") {
    setUserContext("welcome", 0);
    return `END ${THANK_YOU_MESSAGE}`;
  } else {
    return `END ${INVALID_REQUEST_MESSAGE}`;
  }
}
