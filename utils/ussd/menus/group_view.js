import {
    GROUP_MEMBER_MENU,
    GROUP_ADMIN_MENU,
} from "../responses.js";
import UserInputHandler from "../app.js";

import { createGroup } from "../../../database/services/groups.services.js";

// Variable for index
let _index = null;
let _text = null;

// Menu generator for group creation menu
async function generateViewGroupMenu(text, index, userid, group) {
  let prompt = "";
  setIndex(index);
  setText(text);
  console.log("Text inside create group menu", _text);
  try {
    if (_text === "") {
    } else if (_text === "1") {
      prompt = `END ${userid}`;
    } else if (_text === "2") {
      prompt = `END ${userid}`;
    } else if (_text === "3") {
      prompt = `END ${userid}`;
    } else if (_text === "4") {
      prompt = `END ${userid}`;
    } else if (_text === "5") {
      prompt = `END ${userid}`;
    } else if (_text === "6") {
      prompt = `END ${userid}`;
    } else {
      prompt = `END ${INVALID_REQUEST_MESSAGE}`;
    }
  } catch (error) {
    console.log(error);
  } finally {
    UserInputHandler.setUserContext("welcome", 0);
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

export default generateViewGroupMenu;
