import firebase from "../firebase";

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log("Logged in!");
      console.log(value);
    })
    .catch(() => {
      console.log("Something went wrong!");
    });
};