// menuGenerator.js

import { WELCOME_MESSAGE, MAIN_MENU, REGISTER_PROMPT } from "./responses";

export function generateMenuPrompt(registered, userGroups, selectedGroup) {
  let prompt = "";
  if (!registered) {
    // If user is not registered, show option to create account
    prompt += `${MAIN_MENU.CREATE_ACCOUNT}\n`;
  } else {
    // If user is registered, show permanent options
    prompt += `${MAIN_MENU.CREATE_GROUP}\n`;
    prompt += `${MAIN_MENU.EXIT}\n`;
  }

  if (userGroups.length === 0) {
    prompt += REGISTER_PROMPT;
  } else {
    // If user is in groups, generate menu for each group
    userGroups.forEach((group, index) => {
      prompt += `${index + 1}. View Group: ${group.name}\n`;
    });

    // Add options for selected group
    if (selectedGroup) {
      prompt += `\nGroup: ${selectedGroup.name}\n`;
      prompt += `1. View Remaining Balance\n`;
      prompt += `2. View Contribution Amount\n`;
      prompt += `3. Contribute\n`;
      prompt += `4. View Next Cashout Date\n`;
      prompt += `5. View Contribution Day\n`;
    }
  }

  return prompt;
}
