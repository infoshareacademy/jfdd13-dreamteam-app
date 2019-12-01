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
          console.log("Poprawnie zarejestrowano");
          firebase
            .database()
            .ref("/users")
            .push({
              id: user.uid,
              name,
              email
            });
        });
    });
};