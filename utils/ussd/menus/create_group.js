import {
  INVALID_REQUEST_MESSAGE,
  GROUP_CREATION_PROMPTS,
} from "../responses.js";
import { setUserContext } from "../app.js";

import { createGroup } from "../../../database/services/groups.services.js";

// Variable for index
let _index = null;
let _text = null;

// Group registration object
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

// Menu generator for group creation menu
async function generateCreateGroupMenu(text, index, userid) {
  let prompt = "";
  setIndex(index);
  setText(text);
  console.log("Text inside create group menu", _text);
  if (_text && !groupRegistration.name) {
    groupRegistration.name = _text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.NUMBER_OF_MEMBERS}`;
  } else if (_text && !groupRegistration.noOfMembers) {
    groupRegistration.noOfMembers = _text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.CONTRIBUTION_AMOUNT}`;
  } else if (_text && !groupRegistration.contributionAmount) {
    groupRegistration.contributionAmount = _text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.CONTRIBUTION_DAY}`;
  } else if (_text && !groupRegistration.contributionDay) {
    groupRegistration.contributionDay = _text;
    prompt += `CON ${GROUP_CREATION_PROMPTS.FINE_AMOUNT}`;
  } else if (_text && !groupRegistration.fineAmount) {
    groupRegistration.fineAmount = _text;
    console.log("Group registration", groupRegistration);
    await createGroup(groupRegistration, userid);
    // reset the user context
    setUserContext("welcome", 0);

    prompt += `END ${GROUP_CREATION_PROMPTS.SUCCESS}`;
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

export default generateCreateGroupMenu;
