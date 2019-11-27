import firebase from "../firebase";

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log("Zalogowany!");
      console.log(value);
    })
    .catch(() => {
      console.log("Spróbuj jeszcze raz!");
    });
};

export const register = (email, password, name) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: "name"
        })
        .then(() => {
          console.log("Poprawnie zarejestrowano dane: email, hasło i imię");
        });
    });
};