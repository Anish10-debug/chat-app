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
