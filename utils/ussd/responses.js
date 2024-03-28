export const WELCOME_MESSAGE = "Welcome to Merry go round";
const greeting = getGreeting();
export const GREET_USER = `${greeting}`;
export const THANK_YOU_MESSAGE = "Thank you for using Merry go round.";
export const INVALID_REQUEST_MESSAGE = "Invalid request. Please try again.";
export const ERROR_MESSAGE = "An error occurred. Please try again later.";

export const MAIN_MENU = {
  CREATE_ACCOUNT: "1. Create Account",
  MY_ACCOUNT: "97. My Account",
  BACK: "0. Back",
  EXIT: "00. Exit",
  CREATE_GROUP: "98. Create Group",
  ABOUT: "99. About",
};

export const NO_GROUPS_MESSAGE = "You are not in any groups yet.";



// GROUP CREATION PROMPTS
export const GROUP_CREATION_PROMPTS = {
  NAME: "Enter the group name",
  NUMBER_OF_MEMBERS: "Enter the number of members",
  CONTRIBUTION_AMOUNT: "Enter the contribution amount",
  CONTRIBUTION_DAY: "Enter the contribution day",
  FINE_AMOUNT: "Enter the fine amount",
  SUCCESS: "Account created successfully.",
};

export const GROUP_CREATION_SUCCESS = "Group created successfully.";

// User account creation prompts
export const ACCOUNT_CREATION_PROMPTS = {
  FULL_NAME: "Enter your full name",
  ID_NUMBER: "Enter your ID number",
  DATE_OF_BIRTH: "Enter your date of birth",
  SUCCESS: "Account created successfully.",
};

// show groups options as variables
export const GROUP_OPTIONS = {
  VIEW: "1. View Groups",
  JOIN: "2. Join Group",
  BACK: "0. Back",
};

export const GROUP_MENU = {
  ABOUT: "99. About",
  EXIT: "0. Exit",
};

export const ABOUT_MESSAGE =
  "This is a USSD app that allows users to manage their savings groups.";

export const LEARN_MORE_OPTION = "1. Learn more";

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Afternoon";
  } else {
    greeting = "Evening";
  }

  return `Good ${greeting},`;
}

export const USER_ACCOUNT_VIEW = {
  SHOW_PHONE: "1. Phone Number",
  SHOW_ID: "2. ID Number",
  SHOW_FULL_NAME: "3. Full Name",
  SHOW_DOB: "4. Date of Birth",
  EDIT_ACCOUNT: "5. Edit Account"
};

export const GROUP_MEMBER_MENU = {
  VIEW_REMAINING_BALANCE: "1. View Remaining Balance",
  VIEW_CONTRIBUTION_AMOUNT: "2. View Contribution Amount",
  CONTRIBUTE: "3. Contribute",
  VIEW_NEXT_CASHOUT_DATE: "4. View Next Cashout Date",
  VIEW_CONTRIBUTION_DAY: "5. View Contribution Day"
};

export const GROUP_ADMIN_MENU = {
  VIEW_REMAINING_BALANCE: "1. View Remaining Balance",
  VIEW_CONTRIBUTION_AMOUNT: "2. View Contribution Amount",
  CONTRIBUTE: "3. Contribute",
  VIEW_NEXT_CASHOUT_DATE: "4. View Next Cashout Date",
  VIEW_CONTRIBUTION_DAY: "5. View Contribution Day",
  VIEW_GROUP_MEMBERS: "6. View Group Members"
};


export const FUTURE_IMPLEMENTATION_MESSAGE = "Feature coming soon.";