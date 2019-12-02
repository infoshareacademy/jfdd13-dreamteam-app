import firebase from "firebase";

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

export async function addToFavorites(test) {
 const id =  await firebase.auth().currentUser.uid
 await firebase.database().ref(`/favorites/${id}`).push({
    test: 'come on'
 
  })
}