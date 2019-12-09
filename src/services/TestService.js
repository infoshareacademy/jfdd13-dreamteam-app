import firebase from "../firebase";

export async function sendTest(test, city, title) {
  try{
    const id =  await firebase.auth().currentUser.uid
    await firebase.database().ref(`/test/${id}`).push({
     test: 'on-click test',
     date: new Date().toLocaleString(),
     title: 'testujemy'
   })
  } catch (error) {
  }
 }
  
const prepareTrips = data => {
  return Object.entries(data).map(arr => {
    const [id, value] = arr;
    return {
      id,
      ...value
    };
  });
};