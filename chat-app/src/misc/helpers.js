/*eslint-disable*/
export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' '); //we will get the array of words from nickname

  if (splitName.length > 1) {
    //if we have two words
    return splitName[0][0] + splitName[1][0]; //first letter from first word and first letter from second word
  }

  return splitName[0][0]; //if we have only one word
}
