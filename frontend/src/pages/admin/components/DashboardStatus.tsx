import { useMusicStore } from "@/stores/useMusicStore"
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatusCard from "./StatusCard";
import { useEffect } from "react";

const DashboardStatus = () => {
  const { fetchStatus, status } = useMusicStore();
  const statsData = [
		{
			icon: ListMusic,
			label: "Total Songs",
			value: status.songs.toString(),
			bgColor: "bg-emerald-500/10",
			iconColor: "text-emerald-500",
		},
		{
			icon: Library,
			label: "Total Albums",
			value: status.albums.toString(),
			bgColor: "bg-violet-500/10",
			iconColor: "text-violet-500",
		},
		{
			icon: Users2,
			label: "Total Artists",
			value: status.uniqueArtist.toString(),
			bgColor: "bg-orange-500/10",
			iconColor: "text-orange-500",
		},
		{
			icon: PlayCircle,
			label: "Total Users",
			value: status.users.toLocaleString(),
			bgColor: "bg-sky-500/10",
			iconColor: "text-sky-500",
		},
	];
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((status) => (
        <StatusCard bgColor={status.bgColor} icon={status.icon} label={status.label} value={status.value} iconColor={status.iconColor} key={status.label} />
      ))}
    </div>
  )
}

export default DashboardStatus