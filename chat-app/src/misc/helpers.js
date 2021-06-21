/*eslint-disable*/
export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' '); //we will get the array of words from nickname

  if (splitName.length > 1) {
    //if we have two words
    return splitName[0][0] + splitName[1][0]; //first letter from first word and first letter from second word
  }

  return splitName[0][0]; //if we have only one word
}

export function transfromToArrWithId(snapVal) {
  //in this function we are trying to convert the object returned from snap.val() into an array of room ids
  //each room id in the array will contain the information about the room
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId }; //put id as an attribute alongwith whole snapval[roomId] object
      })
    : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};

  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');

  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');

  //now we have to promises getMsgs and getRooms. We neet to await them
  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);

  mSnap.forEach(msgSnap => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  rSnap.forEach(roomSnap => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}
