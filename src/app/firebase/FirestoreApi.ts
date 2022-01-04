import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { firebaseDB } from "./firebaseConfig"


export const getUserData = (email: string) => {
    return firebaseDB
        .doc(email)
}

export const getNotesCollection = (email: string) => {
    return getUserData(email)
        .collection("Notes")
}
export const getSelectedNote = (email: string, noteId: string) => {
    return getNotesCollection(email).doc(noteId)
}

export const RegisterNewUser = (email: string, userData: FirebaseFirestoreTypes.DocumentData) => {
    getUserData(email)
        .set(userData)
        .then(() => {
            console.log('New User added!');
        }).catch((error) => console.error(error))
}

export const checkUserExsists = async (email: string) => {
    return await getUserData(email)
        .get()
        .then((user) => {
            return user.exists
        }).catch((error) => console.error(error))
}