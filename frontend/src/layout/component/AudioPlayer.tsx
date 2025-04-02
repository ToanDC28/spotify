import { usePlayerStore } from '@/stores/usePlayerStore';
import React, { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, nextSong } = usePlayerStore();
    //to handle play or pause
    useEffect(() => {
        if(isPlaying)
            audioRef.current?.play();
        else
            audioRef.current?.pause();
    }, [isPlaying])

    //handle song ends
    useEffect(() => {
        const audio = audioRef.current;
        audio?.addEventListener('ended', () => {
            nextSong();
        })
        return () => audio?.removeEventListener('ended', () => {
            nextSong();
        });
    }, [currentSong, nextSong])

    //handle song change
    useEffect(() => {
        if(!audioRef.current || !currentSong) return;
        const audio = audioRef.current;
        // check if this is actually a new song
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        if(isSongChange){
            audio.src = currentSong?.audioUrl;
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;
            if(isPlaying) audio.play().catch(err => {
                console.log('Playback error:', err);
            });
        }
    }, [currentSong, isPlaying])
  return (
    <audio ref={audioRef} />
  )
}

export default AudioPlayer