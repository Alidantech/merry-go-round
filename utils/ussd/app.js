import { isUserRegistered } from "../../database/services/users.services.js";
import { getGroupsByIds } from "../../database/services/groups.services.js";
import {
  showRegistrationOptions,
  showRegisteredUserOptions,
} from "./menus/home.js";
import { generateCreateAccountMenu } from "./menus/create_account.js";
import { generateCreateGroupMenu } from "./menus/create_group.js";
import {
  ACCOUNT_CREATION_PROMPTS,
  GROUP_CREATION_PROMPTS,
  INVALID_REQUEST_MESSAGE,
} from "./responses.js";

class UserInputHandler {
  constructor() {
    this.userContext = "welcome";
    this.additionalData = null;
    this.phoneNumber = null;
    this.registered = false;
    this.user = null;
    this.userId = null;
    this.userGroups = null;
    this.requestIndex = 0;
  }

  // Function to extract the latest text from USSD request
  extractLatestText(ussdRequest) {
    if (!ussdRequest || ussdRequest.length === 0) {
      return "";
    }
    const latestText = ussdRequest[ussdRequest.length - 1];
    return latestText;
  }
  async handleInput(text) {
    console.log("session started: AT: ", new Date().toLocaleString());
    const latestText = this.extractLatestText(text);
    console.log("USER RESPONSE IN text:", latestText);

    try {
      this.requestIndex += 1;
       
      // DEBUGGING INFO
      console.log("request number:", this.requestIndex);
      console.log("1. Text:", text);  
      console.log("2. Menu:", this.userContext);

      // Check if user is registered and get user info
      const userInfo = await isUserRegistered(this.phoneNumber);
      this.setUserInfo(userInfo);
      await this.setUserGroups();

      switch (this.userContext) {
        case "welcome":
          return this.welcomeMenu(latestText);
        case "create_account":
          return this.createAccountMenu(latestText);
        case "account_info":
          return this.accountInfoMenu(latestText);
        case "create_group":
          return this.createGroupMenu(latestText);
        case "group_view":
          return this.viewGroupMenu(latestText);
        case "about":
          return this.aboutMenu(latestText);
        default:
          return "CON BAD request. Please try again";     
      }
    } catch (error) {
      console.error("Error handling user input:", error);
      // Reset context and user info upon error
      this.clearContext();
      this.clearUserInfo();
      return "An error occurred while processing your request.";
    }
  }

  // Menu generator for welcome menu
  welcomeMenu(text) {
    let prompt = "";

    if (this.registered == false) {
      prompt += showRegistrationOptions(text);
      this.setUserContext("create_account");
    } else if (this.user) {
      const userOptionsPrompt = showRegisteredUserOptions(
        this.userId,
        this.user,
        this.userGroups,
        text
      ); 

      switch (userOptionsPrompt) {
        case "create":
          prompt += `CON ${GROUP_CREATION_PROMPTS.NAME}`;
          this.setUserContext("create_group");
          break;
        default:
          prompt += userOptionsPrompt;
          break;
      }
    } else {
      prompt += `END ${INVALID_REQUEST_MESSAGE}`;
    }

    return prompt;
  }

  // create account menu generator
  async createAccountMenu(text) {
    const prompt = await generateCreateAccountMenu(text, this.phoneNumber);
    if (prompt === "success") {
      this.clearContext();
      return `END ${ACCOUNT_CREATION_PROMPTS.SUCCESS}`;
    } else {
      return prompt;
    }
  }

  // create group menu generator
  async createGroupMenu(text) {
    const prompt = await generateCreateGroupMenu(text, this.userId);
    if (prompt === "success") {
      this.clearContext();
      return `END ${GROUP_CREATION_PROMPTS.SUCCESS}`;
    }
    return prompt;
  }

  accountInfoMenu(text) {
    return `END Full Name: ${this.user.fullName}\nID Number: ${this.user.idNumber}\nPhone Number: ${this.user.phoneNumber}\nDate of Birth: ${this.user.dob}`;
  }

  setUserContext(context, additionalData) {
    this.userContext = context;
    if (additionalData) {
      this.additionalData = additionalData;
    }
  }

  // Method to set user phone number
  setPhoneNumber(number) {
    this.phoneNumber = number;
  }

  // Method to get user phone number
  getPhoneNumber() {
    return this.phoneNumber;
  }

  // Method to set user info
  setUserInfo(userInfo) {
    this.registered = userInfo.registered;
    this.user = userInfo.userData;
    this.userId = userInfo.userId;
  }

  // Method to clear context upon user session end
  clearContext() {
    this.userContext = "welcome";
  }

  // Method to clear user info upon user session end
  clearUserInfo() {
    this.registered = false;
    this.user = null;
    this.userId = null;
  }

  async setUserGroups() {
    if (!this.registered) return;
    if (this.user.groups.length === 0) return;
    this.userGroups = await getGroupsByIds(this.user.groups, this.userId);
  }
}

export default UserInputHandler;
