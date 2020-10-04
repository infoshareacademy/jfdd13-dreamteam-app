import firebase from "../firebase";

export async function fetchTrips() {
  const dataSnapshot = await firebase.database().ref('/trips').once('value')
  const tripsFromFirebase = dataSnapshot.val()
  return Object.entries(tripsFromFirebase).map(entry => {
    const [id, trip] = entry
    return {
      id,
      ...trip
    }
  })
}

const favRefName = 'favorites'
export async function toggleFavorite(tripId) {
  const userUid = firebase.auth().currentUser.uid
  return await firebase.database()
    .ref(favRefName)
    .child(userUid)
    .child(tripId)
    .transaction(isFav => isFav ? null : true)
}
export function fetchFromFavorites(onSuccess) {
  const userUid = firebase.auth().currentUser.uid
  firebase.database().ref(favRefName).child(userUid).on('value', dataSnapshot => {
    const favoritesFromFirebase = dataSnapshot.val()
    onSuccess(favoritesFromFirebase || {})
  })
}

export function stopFetching() {
  const userUid = firebase.auth().currentUser.uid
  firebase.database().ref(favRefName).child(userUid).off('value')
}

export async function fetchUsers() {
  const dataSnapshot = await firebase.database().ref('/users').once('value')
  const tripsFromFirebase = dataSnapshot.val()
  return Object.entries(tripsFromFirebase).map(entry => {
    const [a, b] = entry;
    return {
      a,
      ...b
    }
  })
}
