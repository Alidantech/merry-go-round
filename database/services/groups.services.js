import { db } from "../firebase.js";

export async function getUserGroups(userGroupsIds) {
  try {
    // Check if userGroupsIds is an array before mapping over it
    if (!Array.isArray(userGroupsIds) || userGroupsIds.length === 0) {
      return []; // Return an empty array if userGroupsIds is not an array or is empty
    }

    // Array to store promises to fetch group names
    const groupPromises = userGroupsIds.map(async (groupId) => {
      const groupDocRef = db.collection("groups").doc(groupId);
      const groupDocSnapshot = await groupDocRef.get();
      if (groupDocSnapshot.exists) {
        const groupName = groupDocSnapshot.data().name;
        return { id: groupId, name: groupName }; // Return an object with group ID and name
      } else {
        return null;
      }
    });

    // Wait for all promises to resolve
    const groupData = await Promise.all(groupPromises);

    // Filter out any null values (for groups that couldn't be found)
    const userGroups = groupData.filter((group) => group !== null);

    return userGroups;
  } catch (error) {
    console.error("Error fetching user's groups:", error);
    throw error;
  }
}
