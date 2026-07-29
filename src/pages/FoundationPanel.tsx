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
                <div className="rounded-[36px] bg-light-overlay dark:bg-overlay p-8 text-light-subtext dark:text-subtext shadow-xl">
                    <h1 className="fmt-2 text-4xl font-black">
                        <span className="m-2 mr-4">🚧</span>
                        Uwaga!
                    </h1>
                    <p className="ml-3 mt-2 text-xl font-semibold opacity-90">
                        Trwają prace nad tą stroną.
                    </p>
                </div>
            </div>
        </div>
    </main>
  )
}