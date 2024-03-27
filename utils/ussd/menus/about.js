import { setUserContext } from "../app.js";
import { ABOUT_MESSAGE, GROUP_MENU } from "../responses.js";

// variable for index
let _index = null;
let _text = null;
// Menu generator for about menu
export default function generateAboutMenu(text, index) {
  setIndex(index);
  setText(text);
  // setUserContext("about", _text.length);
  return ABOUT_MESSAGE + "\n" + GROUP_MENU.EXIT;
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
