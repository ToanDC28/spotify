import {Song} from "../models/song.model.js";
import {User} from "../models/user.model.js";
import {Album} from "../models/album.model.js";

export const getStatus = async (req, res, next) => {
    try {
        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();

        const [totalSongs, totalUsers, totalAlbums, uniqueArtist] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            // means = call all songs, and all albums, then union them, then group by artist, then count
            Song.aggregate([
                {
                    $unionWith: {
                        coll: "album",
                        pipeline: [],
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                    },
                },
                {
                    $count: "count",
                }
            ]),
        ]);
        res.status(200).json({ 
            songs: totalSongs, 
            users:totalUsers, 
            albums: totalAlbums, 
            uniqueArtist: uniqueArtist[0]?.count || 0
        });
    } catch (error) {
        console.log("Error when get status", error);
        next(error);
    }
}