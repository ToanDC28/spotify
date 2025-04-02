import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {
    isLoading,
    featuredSong,
    madeForYou,
    trendingSongs,
    fetchFeaturedSong,
    fetchMadeForYou,
    fetchTrendingSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSong();
    fetchMadeForYou();
    fetchTrendingSongs();
  }, [fetchFeaturedSong, fetchMadeForYou, fetchTrendingSongs]);


  useEffect(() => {
    initializeQueue(madeForYou);
  }, [initializeQueue, madeForYou]);

  console.log({ isLoading, featuredSong, madeForYou, trendingSongs });
  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900 ">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl font-semibold sm:text-3xl mb-6">
            Good Afternoon
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made for You"
              songs={madeForYou}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
