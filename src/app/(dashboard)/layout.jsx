import DialogComponent from "@/components/dialog-component";
import Logo from "@/components/logo";
import ProfileUser from "@/components/profile-component";
import WorkspaceData from "@/components/workspace-componet";
import { fetchWorkspace } from "@/service/dashboard-service";


import { ChevronRight, Star } from "lucide-react";

console.log("DialogComponent:", DialogComponent);
console.log("Logo:", Logo);
console.log("ProfileUser:", ProfileUser);

export default async function DashboardLayout({ children }) {
  const data = await fetchWorkspace();
  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <aside className="w-[400px] h-full p-4 shadow-lg overflow-y-auto mt-20 ">
        <Logo />
        <div className="mt-5 flex justify-between ">
          <h2 className="text-[24px] font-semibold text-[#94A3B8] mb-2">
            Workspace
          </h2>
          <DialogComponent />
        </div>
        <div className="my-8">
          <WorkspaceData data={data} />
        </div>

        <div className="flex justify-between">
          <h2 className="text-[24px] font-semibold text-[#94A3B8]">Favorite</h2>
          <span>
            <Star />
          </span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex space-x-4 ml-28">
            <span className="material-icons-outlined text-2xl cursor-pointer hover:text-indigo-600">
              Workspace
            </span>
            <span className="text-gray-500">
              <ChevronRight />
            </span>

            <span className="material-icons-outlined text-2xl cursor-pointer hover:text-indigo-600">
              {/* <WorkspaceSelector workspaces={workspaces} /> */}
            </span>
          </div>

          <ProfileUser />
        </header>

        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
