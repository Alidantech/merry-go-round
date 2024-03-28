import { INVALID_REQUEST_MESSAGE, GROUP_CREATION_PROMPTS } from "../responses.js";
import { createGroup } from "../../../database/services/groups.services.js";

let groupRegistration = {
  name: null,
  noOfMembers: null,
  contributionAmount: null,
  contributionDay: null,
  fineAmount: null,
  accountNumber: "",
  avatar: "",
  balance: 0,
  currentCycle: "",
  description: "",
  isFull: false,
};

export async function generateCreateGroupMenu(text, userId) {
  let prompt = "";

  if (text === "98" && !groupRegistration.name) {
    prompt += `CON ${GROUP_CREATION_PROMPTS.NAME}`;
  } else if (text && !groupRegistration.name) {
    groupRegistration.name = text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.NUMBER_OF_MEMBERS}`;
  } else if (text && !groupRegistration.noOfMembers) {
    groupRegistration.noOfMembers = text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.CONTRIBUTION_AMOUNT}`;
  } else if (text && !groupRegistration.contributionAmount) {
    groupRegistration.contributionAmount = text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.CONTRIBUTION_DAY}`;
  } else if (text && !groupRegistration.contributionDay) {
    groupRegistration.contributionDay = text;
    try {
      console.log("Group registration", groupRegistration);
      await createGroup(groupRegistration, userId);
      groupRegistration = {
        name: null,
        noOfMembers: null,
        contributionAmount: null,
        contributionDay: null,
        fineAmount: null,
        accountNumber: "",
        avatar: "",
        balance: 0,
        currentCycle: "",
        description: "",
        isFull: false,
      };
      prompt = "success";
    } catch (error) {
      console.error("Error creating group:", error);
      prompt = `END ${INVALID_REQUEST_MESSAGE}`;
    }
  } else {
    prompt = `END ${INVALID_REQUEST_MESSAGE}`;
  }

  return prompt;
}
