import { Song } from "@/types";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentSongIndex: number;
  initializeQueue: (songs: Song[]) => void;
  playAlbum: (song: Song[], startIndex: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setCurrentSong: (song: Song) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentSongIndex: 0,
  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      // currentSong: get().currentSong || songs[0],
      currentSong: songs[0],
      // currentSongIndex: get().currentSongIndex === -1 ? 0 : get().currentSongIndex
      currentSongIndex: 0,
    });
  },
  playAlbum: (song: Song[], startIndex = 0) => {
    if (song.length === 0) {
      return;
    }
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userID,
        activity: `Listening to ${song[startIndex].title} by ${song[startIndex].artist}`,
      });
    }
    set({
      queue: song,
      currentSong: song[startIndex],
      currentSongIndex: startIndex,
      isPlaying: true,
    });
  },
  togglePlay: () => {
    const song = get().currentSong;
    if (song) {
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userID,
          activity: `Listening to ${song.title} by ${song.artist}`,
        });
      }
    }
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
  nextSong: () => {
    const { queue, currentSongIndex } = get();
    const nextIndex = currentSongIndex + 1;
    if (nextIndex < queue.length) {
      set({
        currentSongIndex: nextIndex,
        currentSong: queue[nextIndex],
        isPlaying: true,
      });
      const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {userId: socket.auth.userID, activity: `Listening to ${queue[nextIndex].title} by ${queue[nextIndex].artist}`});
        }
    } else {
      set({ currentSongIndex: 0, currentSong: queue[0], isPlaying: true });
      const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {userId: socket.auth.userID, activity: `Listening to ${queue[0].title} by ${queue[0].artist}`});
        }
    }

  },
  previousSong: () => {
    const { queue, currentSongIndex } = get();
    const prevIndex = currentSongIndex - 1;
    if (prevIndex >= 0) {
      set({
        currentSongIndex: prevIndex,
        currentSong: queue[prevIndex],
        isPlaying: true,
      });
      const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {userId: socket.auth.userID, activity: `Listening to ${queue[prevIndex].title} by ${queue[prevIndex].artist}`});
        }
    } else {
      set({
        currentSongIndex: queue.length - 1,
        currentSong: queue[queue.length - 1],
        isPlaying: true,
      });
      const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {userId: socket.auth.userID, activity: `Listening to ${queue[queue.length - 1].title} by ${queue[queue.length - 1].artist}`});
        }
    }
  },
  setCurrentSong: (song: Song) => {
    if (!song) return;

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userID,
        activity: `Listening to ${song.title} by ${song.artist}`,
      });
    }
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      currentSongIndex: songIndex === -1 ? 0 : songIndex,
      isPlaying: true,
    });
  },
}));
