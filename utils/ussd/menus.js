import { setUserContext } from "./app.js";
import {
  WELCOME_MESSAGE,
  MAIN_MENU,
  GROUP_MENU,
  NO_GROUPS_MESSAGE,
  GROUP_MEMBER_MENU,
  GROUP_ADMIN_MENU,
  ABOUT_MESSAGE,
} from "./responses.js";

// Menu generator for welcome menu
export function generateWelcomeMenu(registered, user, userId) {
  let prompt = "CON " + WELCOME_MESSAGE + ",\n";

  if (!registered) {
    prompt += `${MAIN_MENU.CREATE_ACCOUNT}\n`;
    setUserContext("create_account");
  } else {
    if (user) {
      prompt += `${user.fullName}\n`;
      if (user.groups.length === 0) {
        prompt += NO_GROUPS_MESSAGE + "\n";
      } else {
        prompt += "1. You have a group\n";
        prompt += user.groups[0] + "\n";
      }
    } else {
      prompt += "Welcome!\n";
    }
    prompt += `${MAIN_MENU.CREATE_GROUP}\n`;
    prompt += `${MAIN_MENU.EXIT}\n`;
    // setUserContext("group");
  }
  return prompt;
}

export function generateGroupMenu(groupId, userId) {
  let selectedGroup = {
    name: "Test Group",
    id: groupId,
    member: userId,
  };

  //TODO: get group info from database and userid member info
  let prompt = "";
  prompt += `\nGroup: ${selectedGroup.name}\n`;

  GROUP_OPTIONS_MENU.forEach((option) => {
    prompt += option + "\n";
  });

  setUserContext("group");
  return prompt;
}

// Menu generator for about menu
export function generateAboutMenu() {
  setUserContext("about");
  return ABOUT_MESSAGE + "\n" + GROUP_MENU.EXIT;
}
