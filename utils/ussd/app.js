import { getUserGroups } from "../../database/services/groups.services.js";
import { isUserRegistered } from "../../database/services/users.services.js";
import {
  generateWelcomeMenu,
  generateGroupMenu,
  generateAboutMenu,
} from "./menus.js";

let userContext = "welcome";
let phoneNumber = null;

// User info variables
let registered = false;
let user = null;
let userId = null;

// Cached user data
let cachedUserData = null;

export async function handleUserInput(input) {
  try {
    // Fetch user data if not already cached
    if (!cachedUserData) {
      const userInfo = await isUserRegistered(phoneNumber);
      setUserInfo(userInfo);
      cachedUserData = userInfo;
    } else {
      // Use cached user data
      registered = cachedUserData.registered;
      user = cachedUserData.userData;
      userId = cachedUserData.userId;
    }

    switch (userContext) {
      case "welcome":
        return generateWelcomeMenu(registered, user, userId);
      case "create_account":
      //TODO: Implement account creation logic
      case "group":
        const selectedGroup = await getGroupInfo(input);
        return generateGroupMenu(true, [], selectedGroup);
      case "about":
        return generateAboutMenu();
      default:
        return "Invalid input";
    }
  } catch (error) {
    console.error("Error handling user input:", error);
    return "An error occurred while processing your request.";
  }
}

// Method to set user context
export function setUserContext(context) {
  userContext = context;
}

// Method to set user phone number
export function setPhoneNumber(number) {
  phoneNumber = number;
}

// Method to set user info
export function setUserInfo(userInfo) {
  registered = userInfo.registered;
  user = userInfo.userData;
  userId = userInfo.userId;
}
