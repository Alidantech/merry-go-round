import { setUserContext } from "../app.js";
import {
  NO_GROUPS_MESSAGE,
  GROUP_MEMBER_MENU,
  GROUP_ADMIN_MENU,
} from "../responses.js";

// Menu generator for group menu
export default function generateGroupMenu(groupId, userId) {
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
