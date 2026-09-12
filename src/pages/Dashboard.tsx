import LiveBrowserScreen from "@/components/features/dashboard/LiveBrowserScreen";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout title="Обзор" subtitle="Живой экран Instagram">
      <div className="h-full">
        <LiveBrowserScreen />
      </div>
    </DashboardLayout>
  );
}
