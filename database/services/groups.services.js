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

    // Add the group to the creator's groups array
    const userDocRef = doc(usersCollectionRef, creatorId); // Corrected line
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
export async function getGroupsByIds(groupIds) {
  try {
    const groupsQuery = query(
      groupsCollectionRef,
      where("__name__", "in", groupIds)
    );
    const groupsSnapshot = await getDocs(groupsQuery);

    const groupsData = [];
    groupsSnapshot.forEach((doc) => {
      const groupData = doc.data();
      groupsData.push({ id: doc.id, name: groupData.name });
    });

    return groupsData;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}
