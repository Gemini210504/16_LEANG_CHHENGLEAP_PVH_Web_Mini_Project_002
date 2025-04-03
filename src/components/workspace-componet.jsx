import { fetchWorkspace } from "@/service/dashboard-service";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { WorkspaceEllipsis } from "./workspaceEllipsis-component";

export default async function WorkspaceData() {
  const data = await fetchWorkspace();

  const getRandomColor = () => {
    const colors = [
      "#F96666",
      "#4379F2",
      "#009990",
      "#FF5733",
      "#8A2BE2",
      "#32CD32",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div className="flex flex-col overflow-auto h-[400px]">
        {data?.payload && Array.isArray(data?.payload) ? (
          data.payload.map((ws) => {
        
            if (!ws?.workspaceId) {
              console.warn("Missing workspaceId for workspace:", ws);
              return null;
            }

            return (
              <Link key={ws.workspaceId} href={`/todoPage/${ws.workspaceId}`}>
                <div className="flex flex-row justify-between items-center hover:bg-amber-100 p-2 rounded-md">
                  <span
                    className="rounded-full w-6 h-6 mr-3"
                    style={{ backgroundColor: getRandomColor() }}
                  ></span>

                  <p className="text-[18px] text-left flex-1">
                    {ws.workspaceName}
                  </p>

                  {/* Ellipsis Component */}
                  <WorkspaceEllipsis
                    workspaceId={ws.workspaceId}
                    currentWorkspaceName={ws.workspaceName}
                  />
                </div>
              </Link>
            );
          })
        ) : (
          <p>No workspaces available.</p> 
        )}
      </div>
    </>
  );
}
