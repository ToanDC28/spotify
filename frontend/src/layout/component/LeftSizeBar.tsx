import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeftSizeBar = () => {
  // data fetching => zustand
  const { albums, fetchAllAlbums, isLoading} = useMusicStore();
  const [ defaultPage, setDefaultPage] = useState(1);
  useEffect(() => {
    fetchAllAlbums(defaultPage, 5);
  }, [fetchAllAlbums, defaultPage]);

  const previousPage = () => {
    if(defaultPage === 1) return;

    const n = defaultPage - 1;
    setDefaultPage(n);
  }

  const nextPage = () => {
    if(albums.length < 5) return;

    const n = defaultPage + 1;
    setDefaultPage(n);
  }
  console.log(albums);
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu*/}
      <div className="rounded-lg bg-zinc-900 p-4">
        <Link
          to={"/"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white hover:bg-zinc-800",
            })
          )}
        >
          <HomeIcon className="mr-2 size-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        {/* how to sovle Type '{ children: Element; }' is not assignable to type 'IntrinsicAttributes & Without<WithClerkProp<SignInProps & FallbackProp>, "clerk">'.*/}
        <SignedIn>
          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <MessageCircle className="mr-2 size-5" />
            <span className="hidden md:inline">Message</span>
          </Link>
        </SignedIn>
      </div>
      {/* Library selection */}
      <div className="flex-1 rounded-lg bg-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="mr-2 size-5" />
            <span className="hidden md:inline">Library</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {isLoading ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album) => (
                  <Link
                    key={album._id}
                    to={`/albums/${album._id}`}
                    className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                  >
                    <img
                      src={album.imageUrl}
                      className="w-12 h-12 rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">{album.title}</p>
                        <p className="text-sm text-zinc-400 truncate">Albums &middot; {album.artist}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
        </ScrollArea>
              <Pagination>
                <PaginationContent className="hover:cursor-pointer bg-zinc-900">
                  <PaginationItem>
                    <PaginationPrevious onClick={previousPage} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>{defaultPage}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={nextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
      </div>
    </div>
  );
};

export default LeftSizeBar;
