import db from "../db"; 

export async function isUserRegistered(phoneNumber) {
  try {
    const userSnapshot = await db.collection("users").doc(phoneNumber).get();
    return userSnapshot.exists;
  } catch (error) {
    console.error("Error checking user's registration status:", error);
    throw error;
  }
}
