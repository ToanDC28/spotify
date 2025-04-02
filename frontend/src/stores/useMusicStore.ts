import { axiosInstance } from "@/lib/axios";
import { Album, NewSongRequest, Song, Status } from "@/types";
import { create } from "zustand";

interface MusicStore {
    albums: Album[];
    songs: Song[];
    currentAlbum: Album | null;
    isLoading: boolean;
    error: string | null;
    featuredSong: Song[];
    madeForYou: Song[];
    trendingSongs: Song[];
    status: Status;
    message: string;
    fetchAlbums: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSong: () => Promise<void>;
    fetchMadeForYou: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchAllSongs: (pageNum: number, pageSize: number) => Promise<void>;
    fetchAllAlbums: (pageNum: number, pageSize: number) => Promise<void>;
    fetchStatus: () => Promise<void>;
    addSong: (song: FormData) => Promise<void>;
    addAlbum: (album: FormData) => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSong: [],
    madeForYou: [],
    trendingSongs: [],
    status: {
        albums: 0,
        songs: 0,
        users: 0,
        uniqueArtist: 0
    },
    message: '',
    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/albums");
            const data = await response.data;
            set({ albums: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchAlbums: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs");
            const data = await response.data;
            set({ songs: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchSongs: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchAlbumById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            const data = await response.data;
            set({ currentAlbum: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchAlbumById: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchFeaturedSong: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/feature");
            const data = await response.data;
            set({ featuredSong: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchFeaturedSong: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchMadeForYou: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            const data = await response.data;
            set({ madeForYou: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchMadeForYou: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/trending");
            const data = await response.data;
            set({ trendingSongs: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchTrendingSongs: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchAllSongs: async (pageNum: number, pageSize: number) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/songs/${pageNum}&${pageSize}`);
            const data = await response.data;
            set({ songs: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchAllSongs: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchAllAlbums: async (pageNum: number, pageSize: number) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/albums/" + pageNum + "&" + pageSize);
            const data = await response.data;
            set({ albums: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchAllAlbums: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    fetchStatus: async () => {
        set({ isLoading: true, error: null });
        try {    
            const response = await axiosInstance.get("/status");
            const data = await response.data;
            set({ status: data });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in fetchStatus: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    addSong: async (song: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/admin/song/create", song, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            const data = await response.data;
            set({ message: data.message });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in addSong: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    addAlbum: async (album: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/admin/album/create", album, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            const data = await response.data;
            set({ message: data.message });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in addAlbum: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    deleteSong: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.delete(`/admin/song/delete/${id}`);
            const data = await response.data;
            set({ message: data.message });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in deleteSong: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
    deleteAlbum: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.delete(`/admin/album/delete/${id}`);
            const data = await response.data;
            set({ message: data.message });
        } catch (error:any) {
            set({ error: error.response.data.message });
            console.log("Error in deleteAlbum: ", error);
        }finally{
            set({ isLoading: false });
        }
    },
}));