import { Song } from '@/types';
import {create} from 'zustand'

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
    setCurrentSong: (song: Song) => void
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
            currentSongIndex: 0
        })
    },
    playAlbum: (song: Song[], startIndex=0) => {
        if(song.length === 0){
            return;
        }
        set({ queue: song, currentSong: song[startIndex], currentSongIndex: startIndex, isPlaying: true });
    },
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    nextSong: () => {
        const { queue, currentSongIndex } = get();
        const nextIndex = (currentSongIndex + 1);
        if(nextIndex < queue.length){
            set({ currentSongIndex: nextIndex, currentSong: queue[nextIndex], isPlaying: true });
        }else{
            set({ currentSongIndex: 0, currentSong: queue[0], isPlaying: true });
        }
    },
    previousSong: () => {
        const { queue, currentSongIndex } = get();
        const prevIndex = (currentSongIndex - 1);
        if(prevIndex >= 0){
            set({ currentSongIndex: prevIndex, currentSong: queue[prevIndex], isPlaying: true });
        }else{
            set({ currentSongIndex: queue.length - 1, currentSong: queue[queue.length - 1], isPlaying: true });
        }
    },
    setCurrentSong: (song: Song) => {
        if(!song)
            return;

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        set({ currentSong: song, currentSongIndex: songIndex === -1 ? 0 : songIndex, isPlaying: true });
    },
  }));