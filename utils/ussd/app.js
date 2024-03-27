import { getUserGroups, getGroupInfo } from "./services/groupService";
import { isUserRegistered } from "./services/registrationService";
import { generateMenuPrompt } from "./menuGenerator";

export async function handleUserInput(input, userContext, phoneNumber) {
  switch (userContext) {
    case "welcome":
      const userGroups = await getUserGroups(phoneNumber);
      const registered = await isUserRegistered(phoneNumber);
      return generateMenuPrompt(registered, userGroups);
    case "group":
      const selectedGroup = await getGroupInfo(input); // Get info for selected group
      return generateMenuPrompt(true, [], selectedGroup);
    // Handle other cases
  }
}
