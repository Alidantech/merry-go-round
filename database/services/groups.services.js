import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";

const groupsCollectionRef = collection(db, "groups");
const usersCollectionRef = collection(db, "users");

// Function to create a new group
export async function createGroup(group, creatorId) {
  try {
    const docRef = await addDoc(groupsCollectionRef, group);

    // Add the creatorId as the id in members of the group and give role of admin
    await setDoc(
      doc(collection(db, `groups/${docRef.id}/members`), creatorId),
      {
        userId: creatorId,
        role: "admin",
      }
    );
    const userDocRef = doc(usersCollectionRef, creatorId); 
    await updateDoc(userDocRef, {
      groups: arrayUnion(docRef.id),
    });

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Rethrow the error to handle it in the caller function
  }
}

// Function to get a groups by id and return name and id  and return objects inside array
// Function to get groups by their IDs
export async function getGroupsByIds(groupIds, userId) {
  try {
    const groupsQuery = query(
      groupsCollectionRef,
      where("__name__", "in", groupIds)
    );
    const groupsSnapshot = await getDocs(groupsQuery);

    const promises = groupsSnapshot.docs.map(async (doc) => {
      const groupData = doc.data();
      const userMembership = await getUserGroupMemberInfo(userId, doc.id);
      return {
        id: doc.id,
        name: groupData.name,
        data: groupData,
        userMembership: userMembership,
      };
    });

    // Wait for all promises to resolve
    const resolvedData = await Promise.all(promises);
    return resolvedData;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

// Function to get info about a member of a group
export async function getUserGroupMemberInfo(userId, groupId) {
  try {
    const docSnapshot = await getDoc(
      doc(db, `groups/${groupId}/members/${userId}`)
    );

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching group data:", error);
    throw error;
  }
}

export async function addMemberToGroup(userId, groupId, role) {
  try {
    // Define the data for the member
    const memberData = {
      userId: userId,
      role: role,
    };

    // Add the member document to the group's "members" subcollection
    await setDoc(
      groupsCollectionRef.doc(groupId).collection("members").doc(userId),
      memberData
    );

    console.log("Member added successfully.");

    // Optionally, you can return a success message or other data if needed
    return "Member added successfully.";
  } catch (error) {
    console.error("Error adding member to group:", error);
    throw error;
  }
}
