import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStatus from "./components/DashboardStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect, useState } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import AddSongDialog from "./components/AddSongDialog";
import AddAlbumDialog from "./components/AddAlbumDialog";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const PageNum = 1;
  const PageSize = 5;
  const [defaultTab, setDefaultTab] = useState('songs');
  const { fetchAllAlbums, fetchAllSongs, fetchStatus } = useMusicStore();
  useEffect(() => {
    // Fetch album
    fetchAllAlbums(PageNum, PageSize);
    // Fetch song
    fetchAllSongs(PageNum, PageSize);
    // fetch status
    fetchStatus();
  }, [fetchAllAlbums, fetchAllSongs, fetchStatus]);
  if (!isAdmin && isLoading) {
    return <div>Unauthorize</div>;
  }
  const setDefault = (value) => {
    setDefaultTab(value);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />

      <DashboardStatus />

      <Tabs defaultValue={defaultTab} onValueChange={setDefault} className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <TabsList className="p-1 bg-zinc-800/50">
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-zinc-700"
            >
              <Music className="mr-2 size-4" />
              Songs
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-zinc-700"
            >
              <Album className="mr-2 size-4" />
              Albums
            </TabsTrigger>
          </TabsList>
          {
            defaultTab === 'songs' ? (
              <AddSongDialog />
            ) : (
              <AddAlbumDialog />
            )
          }
        </div>

        <TabsContent value="songs" className="space-y-4">
          <SongsTabContent pageNumber={PageNum} pageSize={PageSize} />
        </TabsContent>
        <TabsContent value="albums" className="space-y-4">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
