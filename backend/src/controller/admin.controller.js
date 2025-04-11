import { Song } from '../models/song.model.js'
import { Album } from '../models/album.model.js'
import cloudinary from '../lib/cloudinary.js';

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(
            file.tempFilePath, {
                resource_type: "auto",
            }
        )
        return result;
    } catch (error) {
        console.log("Error when upload song to cloudinary", error);
        throw new Error(error);
    }
}
const deleteFromCloudinary = async (publicId, type) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: type,
            type: "upload",
        });
        return result;
    } catch (error) {
        console.log("Error when delete song from cloudinary", error);
        throw new Error(error);
    }
}

export const createSong = async (req, res, next) => {

    if(!req.files || !req.files.audioFile || !req.files.imageFile){
        return res.status(400).json({ message: "Please upload all files" });
    }
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    const audioUploadResult = await uploadToCloudinary(audioFile);
    const imageUploadResult = await uploadToCloudinary(imageFile);
    try {
        
        const { title, artist, albumId, duration } = req.body;
        const song = new Song({
            title,
            artist,
            audioUrl: audioUploadResult.secure_url,
            imageUrl: imageUploadResult.secure_url,
            imagePublicId: imageUploadResult.public_id,
            audioPublicId: audioUploadResult.public_id,
            duration,
            albumId : albumId || null,
        });
        await song.save();

        // if song belong to an album, update the album's song array
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id}
            });
        }
        res.status(201).json({ message: "Create song successfully", song })
    } catch (error) {
        console.log("Error when create song", error);
        if(req.files && req.files.audioFile && req.files.imageFile){
            const audioPublicId = audioUploadResult.public_id;
            const imagePublicId = imageUploadResult.public_id;
            await deleteFromCloudinary(audioPublicId, "video");
            await deleteFromCloudinary(imagePublicId, "image");
        }
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params
        const song = await Song.findById(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id},
            })
        }

        await Song.findByIdAndDelete(id);

        await deleteFromCloudinary(song.audioPublicId, "video");
        await deleteFromCloudinary(song.imagePublicId, "image");

        res.status(200).json({ message: "Delete Song Successfully" });
    } catch (error) {
        console.log("Error when delete song", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    const { imageFile } = req.files;
    const imageUrl = await uploadToCloudinary(imageFile);
    try {
        const { title, artist, releaseYear } = req.body;

        const album = new Album({
            title: title,
            artist: artist,
            releaseYear: releaseYear,
            imageUrl: imageUrl.secure_url,
            imagePublicId: imageUrl.public_id
        });
        await album.save();

        res.status(201).json(album);
    } catch (error) {
        console.log("Error when create album", error);
        await deleteFromCloudinary(imageUrl.public_id, "image");
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        const album = await Album.findById(id);
        await Album.findByIdAndDelete(id);
        await deleteFromCloudinary(album.imagePublicId, "image");
        res.status(201).json({ message: " Album deleted successfully" });
    } catch (error) {
        console.log("Error when delete album", error);
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ isAdmin: true});
}