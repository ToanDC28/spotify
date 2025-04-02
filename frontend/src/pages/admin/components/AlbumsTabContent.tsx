import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const AlbumsTabContent = () => {
  const { albums, deleteAlbum, message, fetchAllAlbums } = useMusicStore();
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    if(albums.length < 5) return;

    const n = currentPage + 1;
    setCurrentPage(n);
  }

  const previousPage = () => {
    if(currentPage === 1) return;

    const n = currentPage - 1;
    setCurrentPage(n);
  }

  useEffect(() => {
    fetchAllAlbums(currentPage, 5);
  }, [currentPage, fetchAllAlbums ])
  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          albums.map((album) => (
            <TableRow key={album._id}>
              <TableHead>
                <img className="p-4" src={album.imageUrl} alt={album.title} />
              </TableHead>
              <TableHead>{album.title}</TableHead>
              <TableHead>{album.artist}</TableHead>
              <TableHead><Calendar />{album.releaseYear}</TableHead>
              <TableHead>{album.songs.length}</TableHead>
              <TableHead>
                <Button variant={"secondary"}
                size={"sm"} 
                className="text-red-400 hover:bg-red-400/10"
                onClick={() => deleteAlbum(album._id)}
                >
                  <Trash />
                </Button>
              </TableHead>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
    <Pagination>
      <PaginationContent className="hover:cursor-pointer">
        <PaginationItem>
          <PaginationPrevious onClick={previousPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={nextPage}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  )
}

export default AlbumsTabContent