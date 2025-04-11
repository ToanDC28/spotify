import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { PaginationRequest } from "@/types";
import { Calendar, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const SongsTabContent = ({pageNumber, pageSize}: PaginationRequest) => {
  const { songs, fetchAllSongs, deleteSong, createSongSuccess } = useMusicStore();
  const [ currentPage, setCurrentPage ] = useState(1);
  const nextPage = () => {
    if(songs.length < pageSize) return;

    const n = currentPage + 1;
    setCurrentPage(n);
    console.log(currentPage)
    // fetchAllSongs(n, pageSize);
  }
  const previousPage = () => {
    if(currentPage === 1) return;
    
    const n = currentPage - 1;
    setCurrentPage(n);
    console.log(currentPage)
    // fetchAllSongs(n, pageSize);
  }
  const deleteSongHandler = (id: string) => {
    deleteSong(id);
  }
  useEffect(() => {
    fetchAllSongs(currentPage, pageSize);
  }, [currentPage, fetchAllSongs, pageSize, createSongSuccess]);
  return (
    <>
    <div className="w-full bg-zinc-800/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Released Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id}>
              <TableHead>
                <img src={song.imageUrl} className="size-10 rounded object-cover" alt={song.title} />
              </TableHead>
              <TableHead className="font-medium">{song.title}</TableHead>
              <TableHead>{song.artist}</TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-1">
                  <Calendar  className="size-4"/>
                {song.createdAt.split("T")[0]}
                </span>
              </TableHead>
              <TableHead>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-red-400 hover:bg-red-400/10"
                  onClick={() => {
                    deleteSongHandler(song._id);
                  }}
                >
                  <Trash2 />
                </Button>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent className="hover:cursor-pointer">
          <PaginationItem>
            <PaginationPrevious onClick={previousPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={nextPage}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    </>
  );
};

export default SongsTabContent;
