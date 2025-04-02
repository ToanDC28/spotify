import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Song } from "@/types"
import { Pause, PlayIcon } from "lucide-react";

const PlayButton = ({songs, index} : {songs: Song[], index: number}) => {
    const {currentSong, isPlaying, setCurrentSong, togglePlay, initializeQueue} = usePlayerStore();
    const isCurrentSong = currentSong?._id === songs[index]._id;
    const handlePlay = () => {
        initializeQueue(songs);
        if(isCurrentSong){
            togglePlay();
        }else{
            setCurrentSong(songs[index]);
        }
    }
  return (
    <Button size={"icon"} onClick={handlePlay} className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
    opacity-0 translate-y-2 group-hover:translate-y-0 ${
    isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {isCurrentSong && isPlaying ? 
        (<Pause className="size-5 text-black" />) : 
        (<PlayIcon className="size-5 text-black" />)}
    </Button>
  )
}

export default PlayButton