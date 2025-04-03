import { ChevronRight } from "lucide-react";
import ProfileUser from "./profile-component";

export default async function NavbarComponent(){
 
    return (
      <>
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex space-x-4 ml-28 items-center">
            <span className="material-icons-outlined text-2xl cursor-pointer hover:text-indigo-600">
              Workspace
            </span>
            <span className="text-gray-500">
              <ChevronRight />
            </span>

            <span className="material-icons-outlined text-2xl cursor-pointer hover:text-indigo-600">
              Name workspace
            </span>
          </div>

          <ProfileUser />
        </header>
      </>
    );
}