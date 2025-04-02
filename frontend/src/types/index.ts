export interface Song{
    _id: string,
    title: string,
    audioUrl: string,
    imageUrl: string,
    artist: string,
    duration: number,
    albumId: string | null,
    createdAt: string,
    updatedAt: string,
}

export interface Album {
    _id: string,
    title: string,
    artist: string,
    imageUrl: string,
    releaseYear: number,
    songs: Song[],
    createdAt: Date,
    updatedAt: Date
}

export interface User {
    _id: string,
    fullname: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date,
    clerkId: string
}

export interface Status {
    songs: number,
    albums: number,
    users: number,
    uniqueArtist: number
}

export interface PaginationRequest {
    pageNumber: number,
    pageSize: number
}

export interface NewSongRequest {
    title: string,
    duration: string,
    artist: string,
    albumId: string
}