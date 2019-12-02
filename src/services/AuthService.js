import firebase from "../firebase";

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log("Zalogowano!");
      console.log(value);
    })
    .then(value => {
      const user = firebase.auth().currentUser;
    })
    .catch(() => {
      console.log("Spróbuj jeszcze raz!");
    });
};

export const signout = (user) => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Wylogowano!");
      });
};

export async function register (email, password, name) => {
  try{
    const userCredential = await firebase.auth.createUserWithEmailAndPassword(email, password)

    const id = userCredential.user.uid
    console.log("Poprawnie zarejestrowano");

    await firebase.database().ref(`/users/${id}`).set({email, password, name})
 
  } catch (error) {
    console.log("Spróbuj jeszcze raz!");
  }
}  