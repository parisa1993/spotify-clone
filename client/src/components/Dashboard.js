import { useState, useEffect, useContext } from "react";
import Player from "./Player";
import Tracks from "./Tracks";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../context/Auth";
import { spotify } from "../spotify";
import { service } from "../service";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard({ code }) {
  const { setCode, accessToken } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    setCode(code);
  }, []);

  useEffect(() => {
    if (!playingTrack) return;

    const lyrics = async () => {
      const res = await service.lyrics(playingTrack.title, playingTrack.artist);
      setLyrics(res.data.lyrics);
    };

    lyrics();
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotify.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotify.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className="dashboard">
      <TextField
        sx={{ width: 500 }}
        value={search}
        placeholder="Search Songs/Artists"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box mt={10} sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {searchResults.map((track, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Tracks
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div>
        {accessToken ? (
          <Player accessToken={accessToken} track={playingTrack} />
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}
