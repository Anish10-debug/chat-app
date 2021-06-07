/*eslint-disable*/
const API_BASE_URL = 'http://api.tvmaze.com';

export async function apiGet(queryString) {
  //https://api.tvmaze.com/search/shows?q=men
  //fetch allows us to fetch the remote data
  //fetch always returns a promise therefore we need to resolve it to get the actual value
  //whatever is returned that should be converted to json and from the json we use another .then to get the result
  //NOTE: .then is always associated with a callback function to get the value
  const response = fetch(`${API_BASE_URL}${queryString}`).then(returnedVal =>
    returnedVal.json()
  );
  return response;
}
