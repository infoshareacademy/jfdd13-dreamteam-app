import firebase from "../firebase";

export async function fetchTrips() {
  const dataSnapshot = await firebase.database().ref('/trips').once('value')
  const tripsFromFirebase = dataSnapshot.val()
  const trips = Object.entries(tripsFromFirebase).map(entry => {
    const [id, trip] = entry
    return {
      id,
      ...trip
    }
  })
  return trips
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
export async function fetchFromFavorites() {
  const userUid = firebase.auth().currentUser.uid
  const dataSnapshot = await firebase.database().ref(favRefName).child(userUid).once('value')
  const favoritesFromFirebase = dataSnapshot.val()
  return favoritesFromFirebase || {}
}