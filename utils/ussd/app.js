import { isUserRegistered } from "../../database/services/users.services.js";
import generateWelcomeMenu from "./menus/home.js";
import generateAboutMenu from "./menus/about.js";
import generateCreateAccountMenu from "./menus/create_account.js";
import generateCreateGroupMenu from "./menus/create_group.js";
import generateAccountInfoMenu from "./menus/account_info.js";
import { getGroupsByIds } from "../../database/services/groups.services.js";

let userContext = "welcome";
let currentIndex = 0;
let additionalData = null;
let phoneNumber = null;

// User info variables
let registered = false;
let user = null;
let userId = null;
let userGroups = null;

let requestIndex = 0;

console.log("session started: AT: ", new Date().toLocaleString());

export async function handleUserInput(text) {
  try {
    requestIndex += 1;
    console.log("request number:", requestIndex);
    console.log("1. Text:", text);
    console.log("2. Menu:", userContext);
    console.log("3. Index:", currentIndex);

    const userInfo = await isUserRegistered(phoneNumber);
    setUserInfo(userInfo);
    await setUserGroups();

    switch (userContext) {
      case "welcome":
        return generateWelcomeMenu(
          registered,
          user,
          userId,
          text,
          currentIndex,
          userGroups
        );
      case "create_account":
        return generateCreateAccountMenu(text, currentIndex);
      case "account_info":
        return generateAccountInfoMenu(text, currentIndex);
      case "create_group":
        return generateCreateGroupMenu(text, currentIndex, userId);
      case "group_view":
      //TODO: Implement group view logic
      case "about":
        return generateAboutMenu(text, currentIndex);
      default:
        return "Invalid request. Please try again";
    }
  } catch (error) {
    console.error("Error handling user input:", error);
    // Reset context and user info upon error
    clearContext();
    clearUserInfo();
    return "An error occurred while processing your request.";
  }
}

// Method to set user context
export function setUserContext(context, index, additionalData) {
  userContext = context;
  currentIndex = index;
  if (additionalData) {
    additionalData = additionalData;
  }
}

// Method to set user phone number
export function setPhoneNumber(number) {
  phoneNumber = number;
}

// Method to get user phone number
export function getPhoneNumber() {
  return phoneNumber;
}

// Method to set user info
function setUserInfo(userInfo) {
  registered = userInfo.registered;
  user = userInfo.userData;
  userId = userInfo.userId;
}

// Method to clear context upon user session end
export function clearContext() {
  userContext = "welcome";
  currentIndex = 0;
}

// Method to clear user info upon user session end
export function clearUserInfo() {
  registered = false;
  user = null;
  userId = null;
}

async function setUserGroups() {
  if (!registered) return;
  if (user.groups.length === 0) return;
  userGroups = await getGroupsByIds(user.groups);
}
