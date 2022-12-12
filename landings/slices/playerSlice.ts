import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Singer, Song, Playlist } from "../interfaces/interfaces";
export interface PlayerState {
  playing: boolean;
  singer: Singer;
  song: Song;
  playlist: Playlist[];
  index: number;
  isFree: boolean;
  adsPlaying: boolean;
}
const initialState: PlayerState = {
  playing: false,
  singer: {} as Singer,
  song: {} as Song,
  playlist: [] as Playlist[],
  index: 0,
  isFree: false,
  adsPlaying: false,
};
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action) => {
      state.song = action.payload;
      state.playing = true;
    },
    pause: (state) => {
      state.playing = false;
    },
    stop: (state) => {
      state.playing = false;
      state.song = {} as Song;
    },

    setPlaylist: (state, action) => {
        state.playlist = action.payload;
    },

    setIndex: (state, action) => {
      if (!state.adsPlaying) {
        state.index = action.payload;
      }
    },
    createPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setSinger: (state, action) => {
      state.singer = action.payload;
    },
    setIsFree: (state, action) => {
      state.isFree = action.payload;
    },
    setAdsPlaying: (state, action) => {
      state.adsPlaying = action.payload;
    },
  },
});
export const {
  play,
  pause,
  stop,
  setPlaylist,
  setIndex,
  createPlaylist,
  setSinger,
  setIsFree,
  setAdsPlaying,
} = playerSlice.actions;

export default playerSlice.reducer;
