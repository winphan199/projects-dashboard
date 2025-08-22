import { LoaderCircle } from "lucide-react";

function DashboardLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle size={40} className="animate-spin" />
    </div>
  );
}

export default DashboardLoading;
