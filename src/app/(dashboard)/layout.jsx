import DialogComponent from "@/components/dialog-component";
import Logo from "@/components/logo";
import NavbarComponent from "@/components/navbar-component";
import ProfileUser from "@/components/profile-component";
import WorkspaceData from "@/components/workspace-componet";
import { fetchWorkspace } from "@/service/dashboard-service";


import { ChevronRight, Star } from "lucide-react";

console.log("DialogComponent:", DialogComponent);
console.log("Logo:", Logo);
console.log("ProfileUser:", ProfileUser);

export default async function DashboardLayout({ children }) {
 
  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[400px] h-full p-4 shadow-lg overflow-y-auto mt-20">
        <Logo />
        <div className="mt-5 flex justify-between">
          <h2 className="text-[24px] font-semibold text-[#94A3B8] mb-5 mt-10">
            Workspace
          </h2>
          <DialogComponent />
        </div>
        <div className="my-8 flex-1">
          <WorkspaceData />
        </div>

        <div className="flex justify-between">
          <h2 className="text-[24px] font-semibold text-[#94A3B8] h-[400ppx] overflow-auto">
            Favorite
          </h2>
          <span>
            <Star />
          </span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavbarComponent />

        <main className="flex-1 p-4 ">{children}</main>
      </div>
    </div>
  );
}
