import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_ClIENT_ID,
});

const setAccessToken = (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
};

const searchTracks = (search) => {
    return spotifyApi.searchTracks(search).then(res => {
        return res;
    })
  };

  export const spotify = {
    setAccessToken,
    searchTracks
  };