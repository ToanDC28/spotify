import { Song } from "../models/song.model.js";
export const getAllSongs = async (req, res, next) => {
    try {
        // -1 = descending => newest -> oldest
        // 1 = ascending => oldest -> newest
        const { pageNum, pageSize } = req.params;
        const songs = await Song.find().sort({ createdAt: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize); // sort by createdAt (the newest one is the first one)
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error when get all song", error);
        next(error);
    }
}

export const getFeatureSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs using mongodb's aggregate pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size: 6}
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error when get feature song", error);
        next(error);
    }
}

export const getMadeForYou = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error when get made for you song", error);
        next(error);
    }
}

export const getTrending = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error when get trending song", error);
        next(error);
    }
}