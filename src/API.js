const API_URL =
  "https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628";

export default {
  search(maxDist, minStars, maxRes) {
    const url = `${API_URL}&maxDistance=${maxDist}&minStars=${minStars}&maxResults=${maxRes}&key=200414472-cec778ee06c27612a21b53d6a62c4e6f`;
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(result => {
        return result.trails;
      });
  }
};
