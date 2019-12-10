import firebase from "../firebase";

export async function login (email, password) {
  try{
   await firebase.auth().signInWithEmailAndPassword(email, password)

  } catch (error) {

    throw error;
  }
} 

export const passwordReset = email => {
  return firebase.auth().sendPasswordResetEmail(email);
}; 

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase.auth().languageCode = "pl";
  provider.setCustomParameters({
    login_hint: "user@example.com"
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const user = result.user;
      const database = firebase.database()
      
      database.ref(`/users/${user.uid}/name`).set(user.displayName)
      database.ref(`/users/${user.uid}/email`).set(user.email)

    })
};

export const signout = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      });
};

export const register = (email, password, name) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
            const user = firebase.auth().currentUser;
            const id = user.uid
            user
                .updateProfile({
                    displayName: name
                })
                .then(() => {
                    firebase
                        .database()
                        .ref(`/users/${id}`)
                        .set({
                            name,
                            email
                        })
                });
        })
        .catch((error => {
            throw error
        }))
};
