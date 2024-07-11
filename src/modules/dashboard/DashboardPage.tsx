import { AdsChart } from '@/modules/dashboard/AdsChart.tsx';
import { AdsTable } from '@/modules/dashboard/AdsTable.tsx';

export function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          Dashboard
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="lg:col-span-1 xl:col-span-1">
            <AdsChart />
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            <AdsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
