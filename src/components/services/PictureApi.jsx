const API_KEY = '31465649-f1ff204e289e0f72e30576924';
const BASE_URL = 'https://pixabay.com/api/?';
async function fetchPicture(pictureName, page) {
  const response = await fetch(
    `${BASE_URL}q=${pictureName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(
    new Error(`Something wrong with this request ${pictureName}`)
  );
}
const api = { fetchPicture };
export default api;
