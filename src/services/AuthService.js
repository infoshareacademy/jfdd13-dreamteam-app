import firebase from "../firebase";

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      try {
        this.setUser(user);
      } catch (err) {
        throw Error(err);
      }
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