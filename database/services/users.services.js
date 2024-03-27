import db from "../db";

export async function getUserGroups(phoneNumber) {
  try {
    const userGroupsSnapshot = await db
      .collection("userGroups")
      .where("phoneNumber", "==", phoneNumber)
      .get();
    const userGroups = userGroupsSnapshot.docs.map((doc) => doc.data());
    return userGroups;
  } catch (error) {
    console.error("Error fetching user's groups:", error);
    throw error;
  }
}
