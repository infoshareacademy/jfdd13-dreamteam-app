import firebase from "../firebase";

export async function login (email, password) {
  try{
  const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
  const id = userCredential.user.uid
  console.log("Zalogowano!");
 
  } catch (error) {
    console.log("Spróbuj jeszcze raz!");
  }
} 

export const signout = (user) => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Wylogowano!");
      });
};

export async function register (email, password, name) {
  
  try{
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
    console.log("Poprawnie zarejestrowano")
    const id = userCredential.user.uid
    await firebase.database().ref(`/users/${id}`).set({email, password, name})
    console.log("Dodano do bazy");
  } catch (error) {
    console.log("Spróbuj jeszcze raz")
  }
}