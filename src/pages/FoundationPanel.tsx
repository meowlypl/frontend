import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function Construction() {
  return (
    <main className="grid min-h-screen bg-light-base dark:bg-base dark:border-[#8b693a] shadow-2xl lg:grid-cols-[290px_1fr]">
        <div className="hidden lg:block">
            <Sidebar />
        </div>

        <div className="flex flex-col">
            <Navbar />

            <div className="space-y-8 p-6 lg:p-10">

            </div>
        </div>
    </main>
  )
}