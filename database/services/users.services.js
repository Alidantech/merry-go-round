import { db } from "../firebase.js";
import {
  collection,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export async function isUserRegistered(phoneNumber) {
  try {
    if (!phoneNumber) {
      throw new Error("Phone number is required");
    }

    const userQuery = query(
      usersCollectionRef,
      where("phoneNumber", "==", phoneNumber)
    );

    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return { registered: false, userData: null };
    }
    const userData = userSnapshot.docs[0].data();
    const userId = userSnapshot.docs[0].id;

    return { registered: true, userId, userData };
  } catch (error) {
    console.error("Error checking if user is registered:", error);
    throw error;
  }
}

export async function registerUser(user) {
  try {
    // Add a new document to the users collection
    const newUserRef = await addDoc(usersCollectionRef, user);
    return newUserRef.id;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function getUserGroups(userId) {
  try {
    // Query users collection where document ID equals the provided userId
    const userDoc = await getDoc(doc(usersCollectionRef, userId));
    if (userDoc.exists()) {
      const { groups } = userDoc.data();
      return groups;
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user's groups:", error);
    throw error;
  }
}

export async function addUserToGroup(userId, groupId) {
  try {
    // Update the user document to add the new group to the groups array
    await updateDoc(doc(usersCollectionRef, userId), {
      groups: arrayUnion(groupId),
    });
  } catch (error) {
    console.error("Error adding user to group:", error);
    throw error;
  }
}



export async function removeUserFromGroup(userId, groupId) {
  try {
    // Update the user document to remove the group from the groups array
    await updateDoc(doc(usersCollectionRef, userId), {
      groups: arrayRemove(groupId),
    });
  } catch (error) {
    console.error("Error removing user from group:", error);
    throw error;
  }
}

export function userSnapshotListener(userId, callback) {
  const userDocRef = doc(usersCollectionRef, userId);
  const unsubscribe = onSnapshot(userDocRef, (doc) => {
    if (doc.exists()) {
      const userData = doc.data();
      callback(userData);
    } else {
      console.error("User not found");
    }
  });

  return unsubscribe;
}
