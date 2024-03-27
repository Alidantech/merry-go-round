// ussdApp.js
import {
  generateWelcomeMenu,
  generateIdNumberMenu,
  generateFullNameMenu,
} from "./menuUtils";
import { registerUser } from "./services/registrationService";

let userContext = "welcome";
let phoneNumber = ""; 
let idNumber = ""; 

export function handleUserInput(input) {
  switch (userContext) {
    case "welcome":
      userContext = "idNumber";
      return generateIdNumberMenu();
    case "idNumber":
      // Store ID number
      idNumber = input;
      userContext = "fullName";
      return generateFullNameMenu();
    case "fullName":
      // Register user with stored phone number, full name, and ID number
      registerUser(phoneNumber, input, idNumber); 
      userContext = "registered";
      return "Account created successfully!";
    case "registered":
      // Handle other contexts or actions after registration
      break;
    default:
      return "Invalid input. Please try again.";
  }
}


// Function to set phone number from USSD request
export function setPhoneNumber(number) {
  phoneNumber = number; 
}
