import firebase from "../firebase";

export const sendTrip = trip => {
  const userId = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref("/trip")
    .push({
      userId,
      test,
      createdAt: new Date().toISOString()
    });
};

const prepareTrips = data => {
  return Object.entries(data).map(arr => {
    const [id, value] = arr;
    return {
      id,
      ...value
    };
  });
};

export const watchTrips = onSuccess => {
  return firebase
    .database()
    .ref("/trip")
    .on("value", dataSnapshot => {
      const trips = dataSnapshot.val();
      onSuccess(prepareTrips(trips));
    });
};

export const stopTrips = () => {
  firebase
    .database()
    .ref("/trip")
    .off();
};


//////userService?//////

const prepareUsers = data => Object.values(data);

export const watchUsers = onSuccess => {
  return firebase
    .database()
    .ref("/users")
    .on("value", dataSnapshot => {
      const users = dataSnapshot.val();
      onSuccess(prepareUsers(users));
    });
};

export const stopUsers = () => {
  firebase
    .database()
    .ref("/users")
    .off();
};