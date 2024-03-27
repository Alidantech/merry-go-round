// responseRouter.js
import {
  generateWelcomeMenu,
  generateMainMenu,
  generateRegisterMenu,
} from "./menuUtils";

export function routeResponse(input, context) {
  switch (context) {
    case "welcome":
      return generateWelcomeMenu();
    case "mainMenu":
      return generateMainMenu();
    case "register":
      return generateRegisterMenu();
    // Add more cases for other contexts...
    default:
      return "Invalid input. Please try again.";
  }
}
